import { Controller, Get, Param, Query, Put, Body } from '@nestjs/common';
import { HomesService } from './homes.service';

@Controller('home')
export class HomesController {
  constructor(private readonly homesService: HomesService) {}

  @Get('find-by-user/:userId')
  findByUser(@Param('userId') userId: string, @Query('page') page: string) {
    const pageNumber = parseInt(page, 10) || 1;
    return this.homesService.findByUser(+userId, pageNumber);
  }

  @Put('update-users/:homeId')
  updateUsers(
    @Param('homeId') homeId: string,
    @Body('userIds') userIds: number[],
  ) {
    return this.homesService.updateUsers(+homeId, userIds);
  }
}
