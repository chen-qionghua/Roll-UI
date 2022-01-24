rm -rf dist &&
yarn build &&
cd dist &&
git init &&
git add . &&
git commit -m "update" &&
git branch -M main &&
git remote add origin git@github.com:chen-qionghua/Roll-UI-website.git &&
git push -f -u origin main &&
cd ..
echo https://chen-qionghua.github.io/Roll-UI-website/index.html