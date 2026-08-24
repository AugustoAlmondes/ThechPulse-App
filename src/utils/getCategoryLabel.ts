export function getCategoryLabel(category?: string[]): string {
    const first = category?.[0];
    if (!first || typeof first !== 'string' || first.trim() === '') {
        return 'Tecnologia';
    }
    if (first === 'science_technology') {
        return 'Ciência e Tecnologia';
    }
    return first.toUpperCase();
}
