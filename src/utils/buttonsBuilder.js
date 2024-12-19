export class ButtonsBuilder {
    static createButton(x, y, width, height, text, borderColor, hoverBorderColor, scene) {
        const buttonGraphics = scene.add.graphics();
        buttonGraphics.lineStyle(4, borderColor, 1);
        buttonGraphics.strokeRoundedRect(-width / 2, -height / 2, width, height, 35);

        const buttonContainer = scene.add.container(x, y, [buttonGraphics]);

        const buttonText = scene.add.text(0, 0, text, {
            fontSize: '48px',
            color: '#ffffff',
        }).setOrigin(0.5);

        buttonContainer.add(buttonText);

        buttonContainer.setSize(width, height);
        buttonContainer.setInteractive();

        buttonContainer.on('pointerover', () => {
            buttonGraphics.clear();
            buttonGraphics.lineStyle(4, hoverBorderColor, 1);
            buttonGraphics.strokeRoundedRect(-width / 2, -height / 2, width, height, 35);
            buttonText.setColor('#149DF2');
        });

        buttonContainer.on('pointerout', () => {
            buttonGraphics.clear();
            buttonGraphics.lineStyle(4, borderColor, 1);
            buttonGraphics.strokeRoundedRect(-width / 2, -height / 2, width, height, 35);
            buttonText.setColor('#ffffff');
        });

        return buttonContainer;
    }

    static createIconButton(x, y, size, svgKey, borderColor, hoverBorderColor, scene) {
        const buttonGraphics = scene.add.graphics();
        buttonGraphics.lineStyle(4, borderColor, 1);
        buttonGraphics.strokeRoundedRect(-size / 2, -size / 2, size, size, size / 4); // Border with rounded corners

        const buttonContainer = scene.add.container(x, y, [buttonGraphics]);

        // Add the SVG icon
        const icon = scene.add.image(0, 0, svgKey)
            .setDisplaySize(size * 0.6, size * 0.6) // Adjust icon size relative to button
            .setTint(0xffffff); // Default icon color is white

        buttonContainer.add(icon);

        // Make the button interactive
        buttonContainer.setSize(size, size);
        buttonContainer.setInteractive();

        // Hover effects
        buttonContainer.on('pointerover', () => {
            buttonGraphics.clear();
            buttonGraphics.lineStyle(4, hoverBorderColor, 1); // Change border color
            buttonGraphics.strokeRoundedRect(-size / 2, -size / 2, size, size, size / 4);
            icon.setTint(0x149DF2); // Change icon color to blue
        });

        buttonContainer.on('pointerout', () => {
            buttonGraphics.clear();
            buttonGraphics.lineStyle(4, borderColor, 1); // Reset border color
            buttonGraphics.strokeRoundedRect(-size / 2, -size / 2, size, size, size / 4);
            icon.setTint(0xffffff); // Reset icon color to white
        });

        return buttonContainer;
    }
}