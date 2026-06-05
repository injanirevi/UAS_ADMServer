# 🚀 Automated CI/CD Deployment Guide

## Daftar Isi
1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Setup GitHub Secrets](#setup-github-secrets)
4. [AWS EC2 Configuration](#aws-ec2-configuration)
5. [Local Testing](#local-testing)
6. [Deployment Flow](#deployment-flow)
7. [Troubleshooting](#troubleshooting)

---

## Overview

Pipeline CI/CD otomatis yang akan:
- ✅ Build image Docker untuk `web-dinamis` (Next.js) dan `web_statis` (Static HTML/Nginx)
- ✅ Push image ke DockerHub secara otomatis
- ✅ Deploy ke AWS EC2 secara otomatis saat push ke branch `main`
- ✅ Terpisah dan independent antar service

**Architecture:**
```
GitHub Push → GitHub Actions (Build) → DockerHub (Registry) → AWS EC2 (Deployment)
                                  ↓
                        Build 2 images parallel:
                        1. web-dinamis_2388010009
                        2. uas_statis_2388010009
```

---

## Prerequisites

### 1. GitHub Repository
- ✅ https://github.com/injanirevi/UAS_ADMServer

### 2. DockerHub Account
- Username: `reviinjani`
- Repositories:
  - `uas_dinamis_2388010009`
  - `uas_statis_2388010009`
- Access Token sudah dibuat

### 3. AWS EC2 Instance
- **Public IP:** 13.229.108.94
- **Username:** ubuntu
- **SSH Key:** `.pem` file sudah ada
- **Docker & Docker Compose:** Sudah terinstall
- **Ports:**
  - Port 80: Web Static
  - Port 3000: Web Dynamic

### 4. Database
- **Type:** MariaDB (dalam Docker container)
- **Database name:** `dbcompro_2388010027`
- **User:** `userwebdinamis`
- **Password:** (akan di-setup via secrets)

---

## Setup GitHub Secrets

GitHub Secrets digunakan untuk menyimpan credential secara aman.

### Langkah-langkah:

1. **Buka GitHub Repository**
   - https://github.com/injanirevi/UAS_ADMServer
   - Klik **Settings** → **Secrets and variables** → **Actions**

2. **Tambahkan Secrets berikut:**

| Secret Name | Value | Contoh |
|---|---|---|
| `DOCKERHUB_TOKEN` | Docker Hub Access Token | `dckr_pat_xxxxxxxxxxxxx` |
| `AWS_EC2_HOST` | Public IP AWS EC2 | `13.229.108.94` |
| `AWS_EC2_KEY` | Isi file `.pem` SSH key | (paste seluruh isi file) |
| `NEXTAUTH_SECRET` | Secret key untuk authentication | Minimal 32 karakter random |

### Cara Menambahkan:

1. Klik **New repository secret**
2. Masukkan **Name** dari tabel di atas
3. Masukkan **Value**
4. Klik **Add secret**

**Cara mendapatkan nilai:**

#### A. Docker Hub Access Token
```bash
# Login ke DockerHub di: https://hub.docker.com/settings/security
# Buat "New Access Token"
# Copy token → paste di GitHub secret DOCKERHUB_TOKEN
```

#### B. AWS EC2 Key (.pem)
```bash
# Buka file .pem di path: D:\Administrasi Server\Materi-Kuliah-Semester-6\UAS_AdmServer\uas_2388010009.pem
# Copy seluruh isinya → paste di GitHub secret AWS_EC2_KEY
```

#### C. Database Password
```
# Deployment saat ini menggunakan MariaDB tanpa password.
# Biarkan DB_PASSWORD kosong di .env dan tidak perlu membuat GitHub secret untuk DB_PASSWORD.
```

#### D. NEXTAUTH_SECRET
```bash
# Generate random string (gunakan di terminal):
# Linux/Mac: openssl rand -base64 32
# Windows PowerShell: [Convert]::ToBase64String((1..32|%{[byte]$RANDOM}))
# Atau gunakan: https://generate-random.org/
```

---

## AWS EC2 Configuration

### Persiapan EC2 (sudah dilakukan)
- ✅ Docker terinstall
- ✅ Docker Compose terinstall
- ✅ Public IP: 13.229.108.94
- ✅ SSH key tersedia

### Test Koneksi SSH
```bash
# Windows PowerShell / Terminal
ssh -i "path/to/uas_2388010009.pem" ubuntu@13.229.108.94

# Jika berhasil, Anda akan login ke EC2
# Keluar dengan: exit
```

### Persiapan Folder di EC2
Workflow GitHub Actions akan otomatis membuat folder ini, tapi Anda bisa persiapkan manual:

```bash
# Login ke EC2 dulu
ssh -i "uas_2388010009.pem" ubuntu@13.229.108.94

# Di dalam EC2:
mkdir -p ~/uas-app
cd ~/uas-app
```

---

## Local Testing

Sebelum push ke GitHub, test aplikasi secara lokal dengan Docker Compose.

### 1. Test web-dinamis

```bash
cd web-dinamis
docker-compose up -d
```

Akses: http://localhost:3000

### 2. Test web_statis

```bash
cd web_statis
docker build -t test-statis .
docker run -p 80:80 test-statis
```

Akses: http://localhost

### 3. Hentikan container

```bash
docker-compose down
docker stop $(docker ps -q)
```

---

## Deployment Flow

### Alur Otomatis Setiap Push ke `main`:

```
1. Developer push ke GitHub (branch main)
   ↓
2. GitHub Actions triggered
   ├─ Job 1: Build & push web-dinamis → DockerHub
   ├─ Job 2: Build & push web_statis → DockerHub
   └─ Job 3: Deploy to AWS EC2
       ├─ SSH ke EC2
       ├─ Pull docker-compose.prod.yml
       ├─ Pull latest images dari DockerHub
       ├─ Stop containers lama
       └─ Start containers baru
   ↓
3. Deploy selesai
   - Web Static: http://13.229.108.94
   - Web Dynamic: http://13.229.108.94:3000
```

### Manual Test Deployment

Jika ingin test tanpa push, bisa manual deploy:

```bash
# 1. SSH ke EC2
ssh -i "uas_2388010009.pem" ubuntu@13.229.108.94

# 2. Ke folder app
cd ~/uas-app

# 3. Pull terbaru
docker-compose -f docker-compose.prod.yml pull

# 4. Restart
docker-compose -f docker-compose.prod.yml down
docker-compose -f docker-compose.prod.yml up -d

# 5. Check status
docker-compose ps
```

---

## Troubleshooting

### ❌ Issue: GitHub Actions gagal

**Solusi:**
```bash
# Check logs di GitHub Actions tab → lihat error message
# Common issues:
1. DOCKERHUB_TOKEN expired → buat token baru di DockerHub
2. AWS_EC2_KEY format salah → copy seluruh isi .pem file (jangan potong)
3. Typo di secret names → periksa kapitalisasi
```

### ❌ Issue: Docker image tidak bisa di-pull di EC2

**Solusi:**
```bash
# SSH ke EC2
ssh -i "uas_2388010009.pem" ubuntu@13.229.108.94

# Login ke DockerHub
docker login -u reviinjani

# Cek image
docker pull reviinjani/uas_dinamis_2388010009:latest
```

### ❌ Issue: Port sudah digunakan

**Solusi:**
```bash
# Cek port yang sedang berjalan
sudo netstat -tlnp | grep LISTEN

# Kill proses di port (contoh port 80)
sudo fuser -k 80/tcp
sudo fuser -k 3000/tcp
```

### ❌ Issue: Database tidak bisa connect

**Solusi:**
```bash
# SSH ke EC2
ssh -i "uas_2388010009.pem" ubuntu@13.229.108.94

# Check database container
docker ps | grep db

# Check logs
docker logs uas-db

# Masuk ke database container
docker exec -it uas-db mariadb -u root
```

---

## Maintenance

### Update Aplikasi

```bash
# 1. Buat perubahan di lokal
git add .
git commit -m "Update aplikasi"

# 2. Push ke GitHub
git push origin main

# 3. GitHub Actions otomatis deploy
# Tunggu selesai, lalu akses ulang aplikasi
```

### Update Database

```bash
# SSH ke EC2
ssh -i "uas_2388010009.pem" ubuntu@13.229.108.94

# Backup database
docker exec uas-db mariadb-dump -u root -p dbcompro_2388010027 > backup.sql

# Restore jika perlu
docker exec -i uas-db mariadb -u root -p dbcompro_2388010027 < backup.sql
```

### Monitor Logs

```bash
# SSH ke EC2
ssh -i "uas_2388010009.pem" ubuntu@13.229.108.94

# Lihat logs real-time
docker-compose -f ~/uas-app/docker-compose.prod.yml logs -f

# Specific service
docker-compose -f ~/uas-app/docker-compose.prod.yml logs -f web-dinamis
docker-compose -f ~/uas-app/docker-compose.prod.yml logs -f web-statis
```

---

## Kesimpulan

Pipeline CI/CD sudah siap! Sekarang setiap push ke `main` akan:
- ✅ Build otomatis
- ✅ Push ke DockerHub
- ✅ Deploy ke AWS EC2
- ✅ Update aplikasi langsung di server

Tidak perlu manual git/SSH lagi! 🎉

---

**Support & Questions:**
Jika ada error, check GitHub Actions logs → Settings → Actions → Recent workflows
