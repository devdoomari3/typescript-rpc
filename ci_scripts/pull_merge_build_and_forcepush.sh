if [ "${REPO_BRANCH}" == "master" ] || [[ $REPO_BRANCH == dist-* ]]
then
  exit
fi
if [ "${REPO_BRANCH}" == "develop" ]
then
  git checkout master
else
  git checkout -b $'dist-'"$REPO_BRANCH"
fi
git checkout master
mkdir -p ~/.git && git config user.email "devdoomari@gmail.com" && git config user.name "devdoomari.circleci"
git merge -X theirs --no-edit $REPO_BRANCH
npm run clean && npm run build
git add -f lib docs
git commit --allow-empty -m $'generated from:'"$COMMIT_HASH"$'\ntriggered by:'"$USERNAME"$'\n[ci skip]'
git tag -a $'dist_'"$REPO_BRANCH"'_'"$BUILD_NUM" -m "."
if [ "${REPO_BRANCH}" == "develop" ]
then
  git push --set-upstream origin master --force --follow-tags
else
  git push --set-upstream origin $'dist-'"$REPO_BRANCH" --force --follow-tags
fi