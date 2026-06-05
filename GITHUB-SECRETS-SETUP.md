# 🔐 GitHub Secrets Setup Guide

Panduan lengkap untuk setup GitHub Secrets agar CI/CD pipeline berfungsi.

## 📋 Daftar Secrets yang Diperlukan

| # | Secret Name | Deskripsi | Nilai |
|---|---|---|---|
| 1 | `DOCKERHUB_TOKEN` | Docker Hub Personal Access Token | `dckr_pat_...` |
| 2 | `AWS_EC2_HOST` | Public IP AWS EC2 | `13.229.108.94` |
| 3 | `AWS_EC2_KEY` | SSH Private Key (.pem) | Seluruh isi file .pem |
| 4 | `NEXTAUTH_SECRET` | NextAuth Secret (min 32 chars) | Random string |

---

## 🔧 Cara Menambahkan Secrets

### Langkah 1: Buka GitHub Repository Settings

1. Pergi ke: https://github.com/injanirevi/UAS_ADMServer
2. Klik menu **Settings** di tab navigasi
3. Di sidebar kiri, klik **Secrets and variables** → **Actions**
4. Klik tombol hijau **New repository secret**

### Langkah 2: Tambahkan Setiap Secret

Untuk setiap secret, lakukan:
1. Masukkan **Name** (gunakan nama dari tabel di atas)
2. Masukkan **Value** (lihat instruksi masing-masing di bawah)
3. Klik **Add secret**
> Untuk `DB_PASSWORD` dan `MARIADB_ROOT_PASSWORD`, biarkan kosong karena deployment saat ini menggunakan MariaDB tanpa password.
---

## 📌 Nilai Untuk Setiap Secret

### 1. DOCKERHUB_TOKEN

**Dimana mendapatkannya:**

1. Buka https://hub.docker.com/settings/security
2. Klik **Create Token** di bagian "Personal Access Tokens"
3. Berikan nama: `uas-ci-cd`
4. Pilih akses: **Read & Write**
5. Klik **Create**
6. Copy token yang ditampilkan

**Contoh:**
```
dckr_pat_D4oM7xK5L9nR2mP8qW3vZ1aB
```

**Masukkan ke GitHub:**
- Name: `DOCKERHUB_TOKEN`
- Value: `dckr_pat_D4oM7xK5L9nR2mP8qW3vZ1aB`

---

### 2. AWS_EC2_HOST

**Nilainya sudah diketahui:**
```
13.229.108.94
```

**Masukkan ke GitHub:**
- Name: `AWS_EC2_HOST`
- Value: `13.229.108.94`

---

### 3. AWS_EC2_KEY

**Dimana mendapatkannya:**

File `.pem` sudah ada di:
```
D:\Administrasi Server\Materi-Kuliah-Semester-6\UAS_AdmServer\uas_2388010009.pem
```

**Cara:**

1. Buka file tersebut dengan Notepad (atau text editor apapun)
2. **Pilih semua** isi file (Ctrl+A)
3. **Copy** (Ctrl+C)

**Contoh isi file .pem:**
```
-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEA2x5p7K8mN9oL4q2r...
...banyak baris...
-----END RSA PRIVATE KEY-----
```

**Masukkan ke GitHub:**
- Name: `AWS_EC2_KEY`
- Value: Paste seluruh isi file .pem (jangan potong)

---

> Untuk `DB_PASSWORD` dan `MARIADB_ROOT_PASSWORD`, deployment saat ini menggunakan MariaDB tanpa password.
> Biarkan variable kosong dan tidak perlu menambahkan secrets GitHub untuk dua nilai ini.

---

### 4. NEXTAUTH_SECRET

**Generate random string:**

Pilih salah satu cara:

#### Cara 1: Online Generator
1. Buka https://generate-random.org/
2. Set length: 32 atau lebih
3. Copy hasil

#### Cara 2: Windows PowerShell
```powershell
[Convert]::ToBase64String((1..32|%{[byte]$RANDOM}))
```

#### Cara 3: Linux/Mac Terminal
```bash
openssl rand -base64 32
```

**Contoh hasil:**
```
X9kZ2mL5pQ8nR3vW6yJ1oP4sT7uI0bC9eF2gH5jK8mN
```

**Masukkan ke GitHub:**
- Name: `NEXTAUTH_SECRET`
- Value: `X9kZ2mL5pQ8nR3vW6yJ1oP4sT7uI0bC9eF2gH5jK8mN`

---

## ✅ Verify Setup

Setelah menambahkan semua secrets:

1. Buka https://github.com/injanirevi/UAS_ADMServer/settings/secrets/actions
2. **Pastikan semua 4 secret sudah muncul di list:**
   - ✓ DOCKERHUB_TOKEN
   - ✓ AWS_EC2_HOST
   - ✓ AWS_EC2_KEY
   - ✓ NEXTAUTH_SECRET

---

## 🧪 Test CI/CD Pipeline

Setelah setup GitHub Secrets selesai:

1. **Buat perubahan kecil** di repo (misalnya update README)
2. **Commit dan Push ke main:**
   ```bash
   git add .
   git commit -m "Test CI/CD pipeline"
   git push origin main
   ```
3. **Monitor di GitHub Actions:**
   - Buka https://github.com/injanirevi/UAS_ADMServer/actions
   - Lihat workflow "CI/CD - Build & Deploy" sedang berjalan
   - Tunggu sampai selesai (biasanya 5-15 menit)

4. **Verifikasi hasil:**
   - Images ter-push ke DockerHub: https://hub.docker.com/u/reviinjani
   - EC2 instances ter-deploy: http://13.229.108.94

---

## ⚠️ Troubleshooting

### Error: "Secret not found"
- Periksa ulang nama secret (harus exactly match dengan workflow file)
- Pastikan tidak ada typo atau extra space

### Error: "Authentication failed"
- DOCKERHUB_TOKEN expired → buat token baru
- AWS_EC2_KEY format salah → copy seluruh isi .pem (jangan potong)
- Pastikan SSH key sudah added di AWS EC2

### Error: "Permission denied"
- AWS_EC2_KEY tidak readable → paste ulang seluruh file
- Periksa file permissions (workflow otomatis set chmod 600)

---

## 📝 Checklist

- [ ] Docker Hub Access Token dibuat dan disimpan
- [ ] AWS_EC2_HOST = 13.229.108.94
- [ ] AWS_EC2_KEY = seluruh isi .pem file
- [ ] NEXTAUTH_SECRET = 32+ character random string
- [ ] Semua 4 secrets sudah di-add di GitHub
- [ ] Test push ke main branch
- [ ] Cek GitHub Actions workflow berjalan
- [ ] Verifikasi aplikasi accessible di AWS

---

**Notes:**
- Secrets tidak akan ditampilkan kembali setelah disimpan
- Jika lupa nilai, buat token/secret baru dan update
- Jangan share secrets ke orang lain atau public repo
