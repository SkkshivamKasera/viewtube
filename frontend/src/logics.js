export const formatValue = (value) => {
    if (value >= 1e9) return (value / 1e9).toFixed(1) + 'B';
    if (value >= 1e6) return (value / 1e6).toFixed(1) + 'M';
    if (value >= 1e3) return (value / 1e3).toFixed(1) + 'K';
    return value;
}

export const timeDifference = (createdAt) => {
    const currentDate = new Date();
    const createdDate = new Date(createdAt);
    const timeDifference = Math.abs(currentDate - createdDate);

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (years > 0) {
        return years + ' year' + (years > 1 ? 's' : '') + ' ago';
    } else if (months > 0) {
        return months + ' month' + (months > 1 ? 's' : '') + ' ago';
    } else if (days > 0) {
        return days + ' day' + (days > 1 ? 's' : '') + ' ago';
    } else if (hours > 0) {
        return hours + ' hour' + (hours > 1 ? 's' : '') + ' ago';
    } else if (minutes > 0) {
        return minutes + ' minute' + (minutes > 1 ? 's' : '') + ' ago';
    } else {
        return seconds + ' second' + (seconds > 1 ? 's' : '') + ' ago';
    }
}