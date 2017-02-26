import { Injectable } from '@angular/core';

import { Color } from '../data/mock-colors';
import { Colors } from '../data/mock-colors';

@Injectable()
export class ColorService {
    getColors(): Promise<Color[]> {
        return Promise.resolve(Colors);
    }
}