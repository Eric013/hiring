module.exports = {
    default: `--require-module ts-node/register --require features/**/*.ts --format summary --format progress-bar`,
    memory: `--require-module ts-node/register --require features/**/*.ts --format summary --format progress-bar --tags "@memory and not @db"`,
    db: `--require-module ts-node/register --require features/**/*.ts --format summary --format progress-bar --tags "@db and not @memory"`,
};
