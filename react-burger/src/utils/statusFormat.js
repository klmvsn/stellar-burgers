export const statusFormat = (status) => {
    switch(status){
        case 'created':
            return 'Создан';
        case 'pending':
            return 'Готовится';
        case 'done':
            return 'Выполнен';
        case 'cancel':
            return 'Отменен'
        default:
            return ''
    }
}