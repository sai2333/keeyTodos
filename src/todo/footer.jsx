import '../assets/styles/footer.scss'
export default {
    //传入变量
    data() {
        return {
            author: 'SAI'
        }
    },
    render() {
        return (
            <div id="footer">
                <span>Written by {this.author}</span>
            </div>
        )
    }
}