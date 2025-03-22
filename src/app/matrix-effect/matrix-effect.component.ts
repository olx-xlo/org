import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-matrix-effect',
  templateUrl: './matrix-effect.component.html',
  styleUrls: ['./matrix-effect.component.scss'],
})
export class MatrixEffectComponent implements OnInit, OnDestroy {
  private readonly chars: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  private readonly textLength: number = 4;
  displayText = this.getRandomString(this.textLength);
  private readonly updateInterval: number = 50;
  private isActive = true;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.startAnimation();
  }

  ngOnDestroy(): void {
    this.isActive = false;
  }

  private startAnimation(): void {
    const generateRandomText = () => {
      if (this.isActive) {
        const randomIndex = Math.floor(Math.random() * this.displayText.length);
        this.displayText = this.replaceChar(
          this.displayText,
          this.getRandomCharacter(),
          randomIndex
        );
        this.cdr.detectChanges();
        setTimeout(generateRandomText, this.updateInterval);
      }
    };
    generateRandomText();
  }

  private getRandomString(length: number): string {
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * this.chars.length);
      result += this.chars[randomIndex];
    }
    return result;
  }

  private getRandomCharacter(): string {
    const randomIndex = Math.floor(Math.random() * this.chars.length);
    return this.chars[randomIndex];
  }

  private replaceChar(
    origString: string,
    replaceChar: string,
    index: number
  ): string {
    const firstPart = origString.slice(0, index);
    const lastPart = origString.slice(index + 1);
    const newString = firstPart + replaceChar + lastPart;
    return newString;
  }
}
