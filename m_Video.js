class m_Video{
	constructor( dirVideo ){
        this.x = random (600, 900);
        this.y = random (400, 600);
        // let rnd = random(0,100);
        // if(rnd<33){
        //     this.x = random(400, 600);
        //     this.y = random (100, 300);
        // }else if(rnd<66){
        //     this.x = random (600, 800);
        //     this.y = random (300, 500);
        // }else{
        //     this.x = random (800, 1000);
        //     this.y = random (500, 650);
        // }

        this.video = createVideo(dirVideo,() => {
                console.log("termino carga")
                this.yaPuedoDarPlay = true;});
        this.video.size(600,600);
        this.yaPuedoDarPlay = false;
	}

    dibujar(){
        imageMode(CENTER); 
        let img = this.video.get();
        image(img,this.x,this.y);
    }

    play(){
        if(this.yaPuedoDarPlay){
            this.video.play();
            this.yaPuedoDarPlay = false;
        }
    }

     
}
	//---------