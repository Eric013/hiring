export class CreateUserCommand {
    constructor(
        public userId: string,
        public userName: string,
    ) {}
}
