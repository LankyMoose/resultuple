# Resultuple

Development monorepo template for **Resultuple**.

Resultaple is a package designed to push and encourage the usage of the "safe assignment operator" proposal currently under development - https://github.com/arthurfiorette/proposal-safe-assignment-operator

## Structure

- `.github`
  - Contains workflows used by GitHub Actions.
- `packages`
  - Contains the individual packages managed in the monorepo.
  - [resultuple](https://github.com/LankyMoose/Resultuple/blob/main/packages/lib)
- `sandbox`
  - Contains example applications and random tidbits.

## Tasks

- Use `make build` to recursively run the build script in each package
- Use `make test` to recursively run the test script in each package
