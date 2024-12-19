export class VolumeController {
    #soundOnIcon;
    #soundOffIcon;
    #isMuted = false;

    static instance;

    constructor(scene) {
        if (VolumeController.instance) {
            return VolumeController.instance;
        }

        this.scene = scene;

        VolumeController.instance = this;
    }

    createControlButton(scene) {
        this.#soundOnIcon = scene.add.image(this.scene.scale.width - 20, 20, 'volumeOn').setInteractive().setOrigin(1, 0).setScale(0.5).setVisible(!this.#isMuted);
        this.#soundOnIcon.on('pointerdown', () => this.toggleSound());

        this.#soundOffIcon = scene.add.image(this.scene.scale.width - 20, 20, 'volumeOff').setInteractive().setOrigin(1, 0).setScale(0.5).setVisible(this.#isMuted);
        this.#soundOffIcon.on('pointerdown', () => this.toggleSound());
    }

    toggleSound() {
        this.#isMuted = !this.#isMuted;

        this.#soundOnIcon.setVisible(!this.#isMuted);
        this.#soundOffIcon.setVisible(this.#isMuted);

        this.scene.sound.mute = this.#isMuted;
    }

    static getInstance(scene) {
        if (!VolumeController.instance) {
            VolumeController.instance = new VolumeController(scene);
        }
        return VolumeController.instance;
    }
}