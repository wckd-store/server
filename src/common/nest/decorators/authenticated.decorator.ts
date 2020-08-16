import { UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from '../guards/authenticated.guard';

export const Authenticated = () => UseGuards(AuthenticatedGuard);