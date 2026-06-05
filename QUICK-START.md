# 🚀 Quick Start: CI/CD Setup

Setup automation deployment dalam 10 langkah! Ikuti checklist di bawah.

---

## ✅ Checklist Setup (Lakukan Urut)

### Phase 1: Persiapan (5 menit)

- [ ] **Step 1:** Baca dokumen `CI-CD-SETUP.md` (background information)
- [ ] **Step 2:** Baca dokumen `GITHUB-SECRETS-SETUP.md` (untuk setup secrets)
- [ ] **Step 3:** Persiapkan nilai-nilai yang dibutuhkan untuk secrets

### Phase 2: Setup GitHub Secrets (10 menit)

- [ ] **Step 4:** Login ke https://github.com/injanirevi/UAS_ADMServer
- [ ] **Step 5:** Buat Docker Hub Access Token di https://hub.docker.com/settings/security
- [ ] **Step 6:** Buka Settings → Secrets and variables → Actions
- [ ] **Step 7:** Tambahkan 6 secrets sesuai tabel di `GITHUB-SECRETS-SETUP.md`:
  - `DOCKERHUB_TOKEN`
  - `AWS_EC2_HOST` = `13.229.108.94`
  - `AWS_EC2_KEY` = isi file .pem
  - `NEXTAUTH_SECRET` (generate random)

### Phase 3: Verify Setup (5 menit)

- [ ] **Step 8:** Pastikan semua 6 secrets sudah ter-add di GitHub
- [ ] **Step 9:** Test koneksi SSH ke EC2 dari lokal (optional):
  ```bash
  ssh -i "path/to/uas_2388010009.pem" ubuntu@13.229.108.94
  ```

### Phase 4: Deploy (automatic)

- [ ] **Step 10:** Push ke GitHub (branch main):
  ```bash
  git add .
  git commit -m "Setup CI/CD pipeline"
  git push origin main
  ```
- [ ] Workflow otomatis dimulai! Pantau di GitHub Actions
- [ ] Setelah selesai (5-15 menit), aplikasi sudah live di:
  - Static: http://13.229.108.94
  - Dynamic: http://13.229.108.94:3000

---

## 📁 Files Yang Sudah Dibuat

```
UAS_ADMServer/
├── .github/workflows/
│   └── ci-cd.yml              ← Workflow otomatis
├── web-dinamis/
│   ├── Dockerfile             ← Sudah ada (Next.js)
│   └── docker-compose.yml     ← Sudah ada
├── web_statis/
│   ├── Dockerfile             ← NEW (Nginx)
│   └── nginx.conf             ← NEW
├── docker-compose.prod.yml    ← NEW (Production)
├── deploy-aws.sh              ← NEW (Manual setup script)
├── CI-CD-SETUP.md             ← Documentation
├── GITHUB-SECRETS-SETUP.md    ← Documentation
├── QUICK-START.md             ← File ini
└── .env.example               ← Reference
```

---

## 🔄 Workflow Pipeline

Setiap kali push ke `main`:

```
Your Local Push
    ↓
GitHub Actions Triggered
    ├─ Build web-dinamis → Push ke DockerHub
    ├─ Build web_statis → Push ke DockerHub
    └─ Deploy ke AWS EC2
         ├─ SSH ke EC2
         ├─ Pull latest images
         ├─ Restart containers
         └─ Verify running
    ↓
Applications Live
    - Static: http://13.229.108.94
    - Dynamic: http://13.229.108.94:3000
```

**⏱️ Waktu total: ~10 menit**

---

## 📊 Architecture

```
        GitHub
          |
          | Push to main
          ↓
    GitHub Actions (CI)
          |
          ├─ Build → Docker
          ├─ Test → Container
          └─ Push → DockerHub
          |
          ↓
      DockerHub (Registry)
          |
          ├─ uas_dinamis_2388010009
          └─ uas_statis_2388010009
          |
          ↓
      AWS EC2 (CD)
          |
          ├─ Web Dynamic (Port 3000)
          ├─ Web Static (Port 80)
          └─ Database (Port 3306)
```

---

## 🔗 Links Penting

- **GitHub Repo:** https://github.com/injanirevi/UAS_ADMServer
- **GitHub Actions:** https://github.com/injanirevi/UAS_ADMServer/actions
- **GitHub Secrets:** https://github.com/injanirevi/UAS_ADMServer/settings/secrets/actions
- **DockerHub Profile:** https://hub.docker.com/u/reviinjani
- **AWS EC2 Instance:** 13.229.108.94

---

## 🆘 Troubleshooting

### ❌ Workflow gagal

**Check:**
1. Buka GitHub Actions tab
2. Klik workflow yang gagal
3. Lihat error message di log
4. Common issues:
   - Secret typo → periksa di Settings
   - Token expired → buat token baru
   - SSH key format → paste ulang .pem

### ❌ Aplikasi tidak accessible

**Check:**
1. SSH ke EC2: `ssh -i "pem" ubuntu@13.229.108.94`
2. Lihat status: `docker ps`
3. Check logs: `docker-compose logs -f`
4. Check ports: `sudo netstat -tlnp`

### ❌ Database error

**Check:**
1. Verify di EC2: `docker ps` (lihat `uas-db` running?)
2. Check logs: `docker logs uas-db`
3. Connect manual: `docker exec -it uas-db mariadb -u root -p`

---

## 📞 Support

Jika ada error:

1. **Baca logs** di GitHub Actions
2. **SSH ke EC2** dan check docker status
3. **Cek GitHub secrets** format dan values
4. **Review documentation** di CI-CD-SETUP.md

---

## ✨ Selesai!

Setelah semua setup selesai, Anda tidak perlu:
- ❌ SSH manual ke EC2
- ❌ Pull code manual
- ❌ Build docker manual
- ❌ Push docker manual
- ❌ Deploy manual

**Semuanya otomatis saat push ke GitHub!** 🎉

---

**Next Steps:**
1. Ikuti checklist di atas
2. Push ke main branch
3. Monitor GitHub Actions
4. Access aplikasi via browser
5. Update kode → Otomatis ter-deploy!

Happy Coding! 🚀
