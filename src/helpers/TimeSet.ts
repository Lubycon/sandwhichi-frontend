class Timeset {
    timeOptions: string[];
    constructor () {
        this.timeOptions = [];
    }

    generateTime () {
        let timeOptions = [];
        for (let i = 1; i <= 12; i++) {
            timeOptions.push(`AM ${i}:00`);
            if (i < 12) {
                timeOptions.push(`AM ${i}:30`);
            }
        }
        for (let i = 1; i <= 12; i++) {
            timeOptions.push(`PM ${i}:00`);
            if (i < 12) {
                timeOptions.push(`PM ${i}:30`);
            }
        }
        return timeOptions;
    }
}

const timeset = new Timeset();
export default timeset;
