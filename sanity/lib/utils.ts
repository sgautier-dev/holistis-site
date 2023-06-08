export function formatDate(dateString: string) {
    const date = new Date(dateString);

    return new Intl.DateTimeFormat('fr-FR', { year: 'numeric', month: 'long' }).format(date);
}