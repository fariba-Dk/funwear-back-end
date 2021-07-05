#!/usr/bin/env bash
# hash bang..not a comment.. purpose of the file: we dont want the build file to be on github but we do want it in heroku to access our front-end
git checkout -b deploy
cd ../funwear-front-end
npm run build
cp -r build ../funwear-back-end
cd ../funwear-back-end
git add -f build
git commit -m 'deploy'
git push heroku deploy:master
git checkout master
git branch -D deploy
