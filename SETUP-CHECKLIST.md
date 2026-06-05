# 📋 Complete Setup Checklist

Ikuti checklist ini untuk setup CI/CD pipeline otomatis dari awal sampai akhir.

---

## ⏱️ Estimasi Waktu: 30 menit

---

## PHASE 1: PERSIAPAN LOKAL (5 menit)

### 1.1 Verify File Project
- [ ] Verify folder struktur lokal:
  ```
  UAS_ADMServer/
  ├── web-dinamis/
  │   ├── Dockerfile
  │   └── docker-compose.yml
  ├── web_statis/
  │   ├── Dockerfile (NEW - sudah ada)
  │   └── nginx.conf (NEW - sudah ada)
  └── .github/workflows/
      └── ci-cd.yml (NEW - sudah ada)
  ```

### 1.2 Verify Git Repository
- [ ] Cek URL repo: `git remote -v`
  - Expected: `origin https://github.com/injanirevi/UAS_ADMServer`
- [ ] Cek branch: `git branch`
  - Expected: on `main` branch

### 1.3 Test Docker Lokal (Optional)
- [ ] Test build web-dinamis: `cd web-dinamis && docker build .`
- [ ] Test build web_statis: `cd web_statis && docker build .`
- [ ] Confirm no errors

---

## PHASE 2: SETUP DOCKERHUB (5 menit)

### 2.1 Create Docker Hub Access Token

- [ ] Login ke https://hub.docker.com/
- [ ] Klik profile icon (top right) → Account Settings
- [ ] Di sidebar, klik **Security**
- [ ] Klik **New Access Token**
- [ ] Berikan nama: `uas-ci-cd`
- [ ] Pilih permission: **Read & Write**
- [ ] Klik **Create**
- [ ] **COPY TOKEN** yang ditampilkan (hanya muncul sekali!)
- [ ] Simpan di text editor sementara

### 2.2 Verify Repositories Exist
- [ ] Buka https://hub.docker.com/repositories
- [ ] Verify repo ada:
  - [ ] `uas_dinamis_2388010009`
  - [ ] `uas_statis_2388010009`
- [ ] Jika belum ada, buat di DockerHub dashboard

---

## PHASE 3: PREPARE AWS EC2 (3 menit)

### 3.1 Verify EC2 Instance
- [ ] Public IP: `13.229.108.94` ✓
- [ ] SSH key (.pem) tersedia di lokal ✓
- [ ] Docker installed: `docker --version` ✓
- [ ] Docker Compose installed: `docker-compose --version` ✓

### 3.2 Test SSH Connection (Optional)
- [ ] Open PowerShell/Terminal
- [ ] Run: `ssh -i "path/to/uas_2388010009.pem" ubuntu@13.229.108.94`
- [ ] Verify login successful
- [ ] Type `exit` untuk keluar

---

## PHASE 4: GENERATE SECRET VALUES (5 menit)

### 4.1 Prepare All Secret Values

Copy-paste tabel di bawah ke notepad temporary (JANGAN share):

```
1. DOCKERHUB_TOKEN
   Value: [Docker Hub Access Token dari step 2.1]
   
2. AWS_EC2_HOST  
   Value: 13.229.108.94
   
3. AWS_EC2_KEY
   Value: [Seluruh isi file .pem - dari D:\Administrasi Server\...]
   
4. NEXTAUTH_SECRET
   Value: [Generate random 32+ chars - lihat di bawah]
```

### 4.2 Generate NEXTAUTH_SECRET

Choose ONE method:

**Option A: Windows PowerShell**
```powershell
[Convert]::ToBase64String((1..32|%{[byte]$RANDOM}))
```

**Option B: Online**
1. Buka https://generate-random.org/
2. Set "Length": 32
3. Copy hasil

**Option C: Linux/Mac Terminal**
```bash
openssl rand -base64 32
```

- [ ] Copy hasil ke notepad temporary

### 4.3 Prepare AWS_EC2_KEY Value

- [ ] Buka file `.pem` dengan Notepad:
  ```
  D:\Administrasi Server\Materi-Kuliah-Semester-6\UAS_AdmServer\uas_2388010009.pem
  ```
- [ ] Select All (Ctrl+A)
- [ ] Copy (Ctrl+C)
- [ ] Paste ke notepad temporary
- [ ] Keep untuk step 5.5

---

## PHASE 5: SETUP GITHUB SECRETS (10 menit)

### 5.1 Open GitHub Settings

- [ ] Go to: https://github.com/injanirevi/UAS_ADMServer
- [ ] Click **Settings** (top menu)
- [ ] Scroll left sidebar, click **Secrets and variables** → **Actions**

### 5.2 Create Secret #1: DOCKERHUB_TOKEN

- [ ] Click **New repository secret** (green button)
- [ ] Name: `DOCKERHUB_TOKEN`
- [ ] Value: `dckr_pat_XXXXXXXXXXXXX` (dari step 4.1)
- [ ] Click **Add secret**

### 5.3 Create Secret #2: AWS_EC2_HOST

- [ ] Click **New repository secret**
- [ ] Name: `AWS_EC2_HOST`
- [ ] Value: `13.229.108.94`
- [ ] Click **Add secret**

### 5.4 Create Secret #3: AWS_EC2_KEY

- [ ] Click **New repository secret**
- [ ] Name: `AWS_EC2_KEY`
- [ ] Value: Paste seluruh isi file .pem (dari step 4.3)
- [ ] Click **Add secret**

### 5.5 Create Secret #4: NEXTAUTH_SECRET

- [ ] Click **New repository secret**
- [ ] Name: `NEXTAUTH_SECRET`
- [ ] Value: [Random string dari step 4.2]
- [ ] Click **Add secret**

### 5.6 Verify All Secrets Added

- [ ] Refresh halaman: https://github.com/injanirevi/UAS_ADMServer/settings/secrets/actions
- [ ] Verify semua 4 secrets muncul:
  - [ ] DOCKERHUB_TOKEN
  - [ ] AWS_EC2_HOST
  - [ ] AWS_EC2_KEY
  - [ ] NEXTAUTH_SECRET

---

## PHASE 6: PUSH & TRIGGER DEPLOYMENT (2 menit)

### 6.1 Commit dan Push ke GitHub

- [ ] Open Terminal/PowerShell di project root
- [ ] Add files:
  ```bash
  git add .
  ```

- [ ] Commit:
  ```bash
  git commit -m "Setup CI/CD pipeline with Docker and GitHub Actions"
  ```

- [ ] Push to main:
  ```bash
  git push origin main
  ```

### 6.2 Monitor GitHub Actions

- [ ] Go to: https://github.com/injanirevi/UAS_ADMServer/actions
- [ ] Lihat workflow "CI/CD - Build & Deploy" mulai berjalan
- [ ] Status akan berubah: `In progress` → `Passed` (atau `Failed`)
- [ ] Tunggu sampai selesai (5-15 menit)

### 6.3 Verify Build Success

- [ ] Klik workflow run untuk lihat detail
- [ ] Cek 3 jobs:
  - [ ] `build-dinamis` - passed ✓
  - [ ] `build-statis` - passed ✓
  - [ ] `deploy` - passed ✓
- [ ] Lihat console output di `deploy` job (scroll down)

---

## PHASE 7: VERIFY DEPLOYMENT (3 menit)

### 7.1 Verify Images di DockerHub

- [ ] Go to: https://hub.docker.com/u/reviinjani
- [ ] Click `uas_dinamis_2388010009` → verify latest tag ada
- [ ] Click `uas_statis_2388010009` → verify latest tag ada

### 7.2 Verify Applications Live

- [ ] Open browser:
  ```
  Static:  http://13.229.108.94
  Dynamic: http://13.229.108.94:3000
  ```

- [ ] Verify both accessible (tidak 404 atau connection refused)

### 7.3 Verify Containers Running di EC2 (Optional)

- [ ] SSH ke EC2:
  ```bash
  ssh -i "uas_2388010009.pem" ubuntu@13.229.108.94
  ```

- [ ] Check containers:
  ```bash
  docker ps
  ```

- [ ] Verify 3 containers running:
  - `uas-web-dinamis`
  - `uas-web-statis`
  - `uas-db`

- [ ] Exit SSH: `exit`

---

## ✅ SUCCESS CHECKLIST

Jika semua di bawah ✓, setup BERHASIL:

- [ ] GitHub Secrets sudah 6 buah
- [ ] GitHub Actions workflow ter-trigger
- [ ] Build web-dinamis passed
- [ ] Build web_statis passed
- [ ] Deploy to EC2 passed
- [ ] Images di DockerHub ter-push
- [ ] Static site accessible di http://13.229.108.94
- [ ] Dynamic app accessible di http://13.229.108.94:3000
- [ ] Database working (bisa cek di app)

---

## 🔄 Sekarang Untuk Update Aplikasi

Setiap kali mau update:

1. **Edit code lokal**
2. **Commit & Push:**
   ```bash
   git add .
   git commit -m "Update aplikasi"
   git push origin main
   ```
3. **GitHub Actions otomatis:**
   - Build → Push → Deploy
4. **Aplikasi updated di AWS** (5-15 menit)

**TIDAK perlu manual SSH/Docker lagi!** 🎉

---

## 🆘 Jika Ada Error

| Error | Solusi |
|-------|--------|
| "Authentication failed" | Cek DOCKERHUB_TOKEN valid |
| "SSH key error" | Copy ulang seluruh .pem file |
| "Secret not found" | Verify nama secret (case-sensitive) |
| "Port already in use" | `sudo fuser -k PORT/tcp` di EC2 |
| "Docker image not found" | Verify di DockerHub image ter-push |

**Detailed troubleshooting:** Lihat `CI-CD-SETUP.md`

---

## 📞 Resources

- Documentation: `CI-CD-SETUP.md`
- Secrets Guide: `GITHUB-SECRETS-SETUP.md`
- Quick Start: `QUICK-START.md`
- GitHub Repo: https://github.com/injanirevi/UAS_ADMServer
- GitHub Actions: https://github.com/injanirevi/UAS_ADMServer/actions

---

## 🎉 Selesai!

Anda sudah punya CI/CD pipeline otomatis! 

**Workflow Pipeline:**
```
Local Code Change
    ↓ git push
GitHub Actions (Build)
    ↓ docker push
DockerHub (Registry)
    ↓ docker pull
AWS EC2 (Live)
```

**No manual deployment needed anymore!** ✨

---

**Print atau bookmark checklist ini untuk reference!** 📋
