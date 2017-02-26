export const Colors: Color[] = [
    { id: 1, color: '#fff', className: 'white-color' },
    { id: 2, color: '#ff8a80', className: 'light-red-color' },
    { id: 3, color: '#80d8ff', className: 'light-blue-color' },
    { id: 4, color: '#a7ffeb', className: 'green-color' },
    { id: 5, color: '#cfd8dc', className: 'grey-color' },
    { id: 6, color: '#ffff8d', className: 'light-yellow-color' },
    { id: 7, color: '#ffd180', className: 'light-orange-color' },
    { id: 8, color: '#ccff90', className: 'teal-color' }
];

export class Color {
    id: number;
    color: string;
    className: string;
}