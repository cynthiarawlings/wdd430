export class Recipe {
    public name: string;
    public description: string;
    public imagePath: string;
    
    constructor(name: string, desription: string, imagePath: string) {
        this.name = name;
        this.description = desription;
        this.imagePath = imagePath;
    }
}