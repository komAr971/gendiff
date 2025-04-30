install: 
	npm install

install-deps:
	install-deps

link:
	npm link

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

lint:
	npx eslint .

lint-fix:
	npx eslint . --fix

publish:
	npm publish --dry-run