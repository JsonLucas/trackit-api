import { Injectable } from '@nestjs/common';
import { request, response } from 'express';
import { IAuthApp } from 'src/entities/auth';
import { AuthToken } from 'src/utils/token';

@Injectable()
export class AppService {}
