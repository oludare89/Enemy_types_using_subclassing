window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 500;
    canvas.height = 800;

    class Game {
        constructor(ctx, width, height){
            this.ctx = ctx
            this.width = width;
            this.height = height;
            this.enemies = [];
            this.enemyInterval = 1000;
            this.enemyTimer = 0;
        }
        update(deltaTime){
            this.enemies = this.enemies.filter(object => !object.markedForDeletion);
            if (this.enemyTimer > this.enemyInterval){
                this.#addNewEnemy();
                this.enemyTimer = 0;
                console.log(this.enemies);
            } else {
                this.enemyTimer += deltaTime;
            }

            this.enemies.forEach(object => object.update(deltaTime));
        }
        draw(ctx){
            this.enemies.forEach(object => object.draw());
        }
        #addNewEnemy(){
            this.enemies.push(new Worm(this));
        }
    }

    class Enemy {
        constructor(game){
            this.game = game;
            this.markedForDeletion = false;
        }
        update(deltaTime){
            this.x -= this.speed * deltaTime;
            if (this.x < 0 - this.width) this.markedForDeletion = true;
        }
        draw(){
            ctx.drawImage(this.image, 0, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
        }
    }

    class Worm extends Enemy {
        constructor(game){
            super(game);
            this.spriteWidth = 229;
            this.spriteHeight = 171;
            this.width = this.spriteWidth * 0.5;
            this.height = this.spriteHeight * 0.5;
            this.x = this.game.width;
            this.y = Math.random() * this.game.height;
            this.image = worm;
            this.speed = Math.random() * 0.1 + 0.1;
        }
    }

    const game = new Game(ctx, canvas.width, canvas.height);
    let lastTime = 1;
    function animate(timeStamp){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        game.update(deltaTime);
        game.draw();
        requestAnimationFrame(animate);
    };

    animate(0);
});