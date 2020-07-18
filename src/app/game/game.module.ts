import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { GamePageRoutingModule } from './game-routing.module';

import { GamePage } from './game.page';
import { OpenTriviaProvider } from '../providers/opentrivia.provider';

const routes: Routes = [
  {
    path: ':pseudo/:difficulty/:category',
    component: GamePage
  }
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GamePageRoutingModule
  ],
  declarations: [GamePage],
  providers: [OpenTriviaProvider]
})
export class GamePageModule {}
