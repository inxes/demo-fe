const STORE_KEY = 'todoList';
export default{
    fetch(){
        return JSON.parse(window.localStorage.getItem(STORE_KEY))
    },
    save(items){
        window.localStorage.setItem(STORE_KEY,JSON.stringify(items)); 
    }
}
