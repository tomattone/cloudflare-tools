<div align="center">
  
  # ☢️ Cloudflare Tools

### Superpowers for your Cloudflare experience

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-ISC-green)
![Author](https://img.shields.io/badge/author-Armando%20Tomazzoni%20Jr-orange)

  <br/>

  <p align="center">
    <a href="#tools">Tools</a> •
    <a href="#installation">Installation</a> •
    <a href="#usage">Usage</a> •
    <a href="#contributing">Contributing</a>
  </p>
</div>

---

## 📋 Tools

Collection of scripts to automate and enhance your Cloudflare experience:

- **📊 enable-bot-management** — Enable bot management across all your accounts
- **🔄 update-ips** — Search and replace all Cloudflare DNS records from an account

---

## 📋 Requirements

- Node.js (recommended version: 23 or higher)
- Cloudflare account with API access

## ⚙️ Installation

```bash
# Clone the repository
git clone git@github.com:tomattone/cloudflare-tools.git

# Navigate to the directory
cd cloudflare-tools

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit the .env file and add:
# CLOUDFLARE_EMAIL=your-email@example.com
# CLOUDFLARE_API_KEY=your-api-key
```

## 🚀 Usage

### Enable Bot Management

```bash
npm run bot-management
```

### Update IPs

```bash
npm run update-ips
```

The necessary parameters are configured in the `.env` file.

---

## 👥 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

<br/>

<div align="center">
  <sub><a href="https://tomazzoni.net" target="_blank">Developed with ❤️ by tomazzoni</a></sub>
</div>
