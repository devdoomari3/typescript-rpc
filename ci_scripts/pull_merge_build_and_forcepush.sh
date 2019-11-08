set -o xtrace

if [ "${REPO_BRANCH}" == "master" ] || [[ $REPO_BRANCH == dist-* ]]
then
  exit
fi
if [ "${REPO_BRANCH}" == "develop" ]
then
  DIST_PUSH_BRANCH="master"
else
  DIST_PUSH_BRANCH=$'dist-'"$REPO_BRANCH"
fi
git checkout -b $DIST_PUSH_BRANCH || git checkout $DIST_PUSH_BRANCH
mkdir -p ~/.git && git config user.email "devdoomari@gmail.com" && git config user.name "devdoomari.circleci"
git merge -X theirs --no-edit $REPO_BRANCH
npm run clean && npm run build
git add -f lib
git commit --allow-empty -m $'generated from:'"$COMMIT_HASH"$'\ntriggered by:'"$USERNAME"$'\n[ci skip]'
git tag -a $'dist_'"$REPO_BRANCH"'_'"$BUILD_NUM" -m "."
git push --set-upstream origin $DIST_PUSH_BRANCH --force --follow-tags