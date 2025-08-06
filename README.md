This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

docker stop $(docker ps -q)
docker rm $(docker ps -aq)

build and run command run locally on docker
docker build -t my-nextjs-app .
docker run -d -p 3000:3000 --env-file .env.local my-nextjs-app

these will push and run image on docker
docker tag my-nextjs-app syedsaqlain46/my-nextjs-app:latest
docker push syedsaqlain46/my-nextjs-app:latest

Once your image is on Docker Hub, anyone (or any server) can run your app with just:
docker pull syedsaqlain46/my-nextjs-app:latest
docker run -d -p 3000:3000 syedsaqlain46/my-nextjs-app:latest








//////////////////
Yes ✅ — **you can pull and run your Docker image on Ubuntu without Docker Desktop installed**, as long as:

### ✅ You have the Docker Engine installed (the CLI tools)

---

### 🐳 Minimal Requirements on Ubuntu:

You only need the **Docker Engine (CLI tools)** to pull and run images:

> 📌 No need for Docker Desktop on Ubuntu or any Linux distro — that’s only for Windows/macOS.

---

### 🔧 Step-by-Step: Pull & Run on Ubuntu

#### 1. **Install Docker Engine (if not already installed)**

Run this once:

```bash
sudo apt update
sudo apt install docker.io -y
```

Enable Docker to run at startup:

```bash
sudo systemctl start docker
sudo systemctl enable docker
```

Verify Docker is installed:

```bash
docker --version
```

---

#### 2. **Login to Docker (Optional if pulling public image)**

If your image is private:

```bash
docker login
```

> Enter your Docker Hub credentials.

---

#### 3. **Pull the image**

Use the tag you pushed earlier:

```bash
docker pull syedsaqlain46/my-nextjs-app:latest
```

---

#### 4. **Run the container**

Make sure your app exposes port `3000` (or change as needed):

```bash
docker run -d -p 3000:3000 syedsaqlain46/my-nextjs-app:latest
```

If using **environment variables**, and your app depends on them (e.g. MongoDB Atlas URL), do:

```bash
docker run -d -p 3000:3000 --env-file .env.local syedsaqlain46/my-nextjs-app:latest
```

> Make sure `.env.local` is on your Ubuntu machine in the same directory where you run the command.

---

### 🌍 Access from other devices:

If running on a remote server (not localhost), ensure:

* You open port `3000` in the firewall.
* You access via `http://your-server-ip:3000`.

---

### ✅ Summary

| Task                  | Requirement                   |
| --------------------- | ----------------------------- |
| Docker Desktop        | ❌ Not needed on Ubuntu        |
| Docker CLI (`docker`) | ✅ Must be installed           |
| Can pull & run image? | ✅ Yes                         |
| .env support          | ✅ via `--env-file .env.local` |

Let me know if you want help automating this with a script or adding a reverse proxy like Nginx.
