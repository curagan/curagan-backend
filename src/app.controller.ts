import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

interface hour {
  jam: number;
}

interface Schedule {
  hari: string;
  jam: hour[];
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
