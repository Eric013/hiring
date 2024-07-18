export class IdGenerator {
    static generate(prefix: string, separator = '-'): string {
        return `${prefix}${separator}${Math.random().toString(36).substring(7)}`;
    }
}
