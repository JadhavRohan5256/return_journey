import { Component, OnDestroy } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: 'app-green-light-red-light',
    templateUrl: './green-light-red-light.component.html',
    styleUrls: ['./green-light-red-light.component.css']
})
export class GreenLightRedLightComponent implements OnDestroy{
    isClicked: boolean = false;
    isOpenInfo: boolean = false;
    isSubmittedInfo: boolean = false;
    isChangedColor: boolean = false;
    speed_interval: any;
    game_interval: any;
    score: number = 0;
    message: string = ''; 
    time: number = 40;  // game timer in second
    gameSpeed = 500;   // game speed in milli seconds

    InfoGroup: FormGroup = new FormGroup({
        'full_name': new FormControl('', [Validators.required]),
        'email': new FormControl('', [Validators.required, Validators.email]),
        'mobile_number': new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(10)]),
        'difficulty_level': new FormControl('', [Validators.required]),
    })
    
    isErrors(controlName: string): string {
        if(!this.InfoGroup.get(controlName)?.valid && this.InfoGroup.get(controlName)?.touched) {
            return 'error';
        }
        else {
            return ''
        }
    }
    
    onBoxClick(): void {
        this.isClicked = true;
        setTimeout(() => {
            this.isClicked = false;
        }, 500);
        if(!this.isChangedColor) {
            this.score += 1;
        }
        else {
            this.gameOver();
        }
    }

    private gameOver(): void {
        const level = this.InfoGroup.value['difficulty_level'];
        if(level === 'hard') {
            this.displayGameMess(25);
        }
        else if(level === 'medium') {
            this.displayGameMess(15);
        }
        else {
            this.displayGameMess(10);
        }
    }
    
    private displayGameMess(level: number): void {
        this.score >= level ? this.message = "You Win!" : this.message = "Game Over!";
        this.isClicked = false;
        this.isOpenInfo = false;
        this.isSubmittedInfo = false;
        this.isChangedColor = false;
        this.time = 40;
        this.clear_interval();
        console.log(this.message);
    }
    
    onCloseInfo(): void {
        this.isOpenInfo = !this.isOpenInfo;
        this.message = '';
    }
    
    onSubmitInfo(): void {
        this.score = 0;
        const level = this.InfoGroup.value.difficulty_level;
        if(level === 'hard') {
            this.gameSpeed = 500;
        }
        else if(level === 'medium') {
            this.gameSpeed = 1000;
        }
        else {
            this.gameSpeed = 2000;
        }
        this.isOpenInfo = false;
        this.isSubmittedInfo = true;
        this.clear_interval();
        
        this.game_interval = setInterval(() => {
            this.time -= 1;
            if(this.time <= 0) {
                this.gameOver();
            }
        }, 1000)
        
        this.speed_interval = setInterval(() => {
            this.isChangedColor = !this.isChangedColor;
        }, this.gameSpeed)
    }

    private clear_interval(): void {
        clearInterval(this.speed_interval);
        clearInterval(this.game_interval);
    }
    
    
    ngOnDestroy(): void {
        this.clear_interval();
    }
}