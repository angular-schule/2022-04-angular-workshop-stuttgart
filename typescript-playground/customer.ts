export class Customer {
    constructor(public id: number) {}

    fooBar(foo: string): string {
        setTimeout(() => {
            console.log('Hallo Welt', this.id);
        }, 2000);
        
        return '';
    }
}

export const foo = 5;
export interface Bar {
    foo: string;
}