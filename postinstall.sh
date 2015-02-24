echo "Running npm postinstall"

# check if jshint is installed
if hash jshint 2>/dev/null; then
    echo "jshint already installed"
else
    echo "Installing jshint"
    npm install -g jshint
fi

# check if eslint is installed
if hash eslint 2>/dev/null; then
    echo "eslint already installed"
else
    echo "Installing eslint"
    npm install -g eslint
fi

# check if jscs is installed
if hash jscs 2>/dev/null; then
    echo "jscs already installed"
else
    echo "Installing jscs"
    npm install -g jscs
fi

# check if bower is installed
if hash bower 2>/dev/null; then
    echo "bower already installed"
else
    echo "Installing bower"
    npm install -g bower
fi

# check if gulp is installed
if hash gulp 2>/dev/null; then
    echo "gulp already installed"
else
    echo "Installing gulp"
    npm install -g gulp
fi

if [ -d .git/hooks ]; then

	if [ -f config/git-hooks/pre-commit ]; then
		echo "Installing pre-commit hook"

		cp config/git-hooks/pre-commit .git/hooks/
		chmod +x .git/hooks/pre-commit
	fi

fi
