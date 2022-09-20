import Toast from './Toast.vue'
import { createVNode, render } from 'vue';
interface ItoastOptions {
    message:string;
    autoClose?:(boolean | number)[];
    position:string;
    closeButton?:{
        text: string;
        callback(): void;
    }
}
export default {
    install:(app:any)=>{
        //是否存在toast，防止toast在未销毁前因为连续点击生成多个toast（防抖）
        let isToast = false
        //相当vue2的Vue.prototype
        app.config.globalProperties.$toast = function(toastOptions:ItoastOptions){
            if(!isToast){
                isToast = true
                let vm:any = createVNode(Toast) //h函数,创建虚拟节点
                let container = document.createElement('div')//创建div容器
                container.setAttribute("id","toastWrapper")
                render(vm,container) //渲染虚拟节点
                document.body.appendChild(container)
                vm.component.props.message = toastOptions.message || ''
                vm.component.props.closeButton.text = toastOptions.closeButton?.text || '关闭'
                vm.component.props.position = toastOptions.position
                vm.component.props.autoClose = toastOptions.autoClose
                isToast = false
            }
        }
        
    }
}