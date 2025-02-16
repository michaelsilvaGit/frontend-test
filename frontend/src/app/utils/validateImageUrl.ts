

export function validateImageUrl(value: string): true | string {
    const regex = /\.(jpeg|jpg|gif|png|webp|bmp|svg)$/i;
    return regex.test(value) ? true : 'URL deve ser de uma imagem válida';
};