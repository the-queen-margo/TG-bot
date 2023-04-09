import React, {useState} from 'react';
import './ProductList.css';
import {ProductItem} from "./ProductItem/ProductItem"
import {useTelegram} from "../../hooks/useTelegram";
import { useCallback, useEffect } from 'react';
const products =[
    {id: '1', title:'Рюкзак 15.6" Acer LS series OBG206, черный ', price:2999, description: 'РюкзакAcer OBG206 для ноутбука диагональю до 15.6 дюймов прослужит очень долго и вынесет все невзгоды городской среды.',img: 'https://items.s1.citilink.ru/1724806_v04_b.jpg'  },
    {id: '2', title:'Ноутбук ASUS VivoBook 15 OLED M513UA-L1412, 15.6", AMD Ryzen 7 5700U 1.8ГГц, 8-ядерный, 16ГБ DDR4, 512ГБ SSD, AMD Radeon , без операционной системы, черный', price:89450, description: 'ASUS VivoBook 15 OLED – это яркий ноутбук, который добавит динамизма и стиля в повседневную жизнь. Современная конфигурация с процессором AMD Ryzen™ 7 5700U обеспечит всю необходимую для дел вычислительную мощность, а для хранения файлов предлагаются два накопителя: высокоскоростной твердотельный и традиционный жесткий диск большой емкости. Ноутбук оснащается высококачественной аудиосистемой с сертификацией Harman Kardon и выдает завораживающее изображение с насыщенными цветами на своем 15-дюймовом OLED-дисплее NanoEdge с разрешением FHD.', img:'https://zoomobi.ru/wp-content/uploads/8/9/8/898b412f987abeee11179fdac4d291d6.jpeg'},
    {id: '3', title:'Коврик для мыши Cactus Black (S) черный, ткань, 250х200х3мм', price:299, description: 'Комфорт при использовании предоставляет коврик для мыши CACTUS CS-MP-D01S.  Относится к профессиональным игровым аксессуарам, обеспечивает точность выполнения любых операций. Выполнен из высококачественных, прочных материалов, основным из которых является особым образом вспененная резина. Она придает изделию гибкость и износостойкость.Коврик для мыши CACTUS CS-MP-D01S имеет оптимальные размеры, удобно размешается на рабочей поверхности. Сверху используется износостойкое тканевое покрытие. Тыльная сторона прочно удерживается на поверхности стола, не скользит, имеет хорошо прошитые края. Выполнен в классическом черном цветовом решении.', img:'https://kotofoto.ru/product_img/2656/410427/410427_kovrik_dlya_myshi_cactus_cs_mp_d02m_sredniy_cherniym.jpg?v=1613584085'},
    {id: '4', title: 'Ноутбук Huawei MateBook D 15 BoD-WFH9, 15.6", IPS, Intel Core i5 1135G7 2.4ГГц, 4-ядерный, 16ГБ DDR4, 512ГБ SSD, Intel Iris Xe graphics , Windows 11 Home, серебристый [53013erx]', price:60000, description: 'HUAWEI MateBook D 15 — ноутбук для работы, учебы, запуска стандартных приложений и просмотра видеоконтента в высоком разрешении. Поддержка Bluetooth пятой версии и беспроводного интернета 6-го поколения дает возможность безопасно обмениваться данными с другими устройствами.', img: "https://avatars.mds.yandex.net/get-mpic/7516494/img_id8695358357240929229.jpeg/orig"},
    {id: '5', title:'Монитор Acer Nitro VG280Kbmiipx 28", черный и черный/синий', price:2999, description: 'Разрешением 3840x2160 пикселей, частотой 60 Гц, IPS-экраном диагональю 28" отличается монитор Acer Nitro VG280Kbmiipx. На нем отображается изображение в формате Ultra HD 4K с высоким уровнем детализации и контрастности, яркость экрана составляет 300 кд/м2.', img: 'https://static.onlinetrade.ru/img/items/b/acer_nitro_vg271zbmiipx_27_ips_black_2053837_1.png' },
    {id: '6', title:'Корпус ATX Aerocool Streak-A-BK-v1, Midi-Tower, без БП, черный [accm-pv19012.11]', price:2999, description: 'Произведенный в Китае корпус ATX AEROCOOL Streak-A-BK-v1 обладает гарантийным сроком в 12 месяцев. Вес модели составляет 2.7 кг, а размеры - 190.1х412.8х382.6 мм. Корпус выполнен в черном цвете, что делает его достаточно лаконичным. Здесь можно разместить видеокарту длиной до 335 мм.Стальные стенки корпуса ATX AEROCOOL Streak-A-BK-v1 имеют толщину 0.5 мм. У фронтальной панели имеется RGB-подсветка, за счет чего она имеет весьма привлекательный внешний вид. Этому способствует и прозрачная боковая панель. В комплект не входит блок питания, но его можно установить сверху. На задней панели имеется один вентилятор, диаметр которого 80 мм. Можно установить дополнительные вентиляторы.', img:'https://avatars.mds.yandex.net/get-mpic/1704691/img_id1767609739633597278.jpeg/orig'},
    {id: '7', title:'Гарнитура Apple AirPods 2 A2032,A2031,A1602, with Charging Case, Bluetooth, вкладыши, белый', price:11999, description: 'Сочетание тщательно продуманного дизайна, передовых технологий и кристально чистого звука. Благодаря чипу H1 могут работать в режиме телефонного разговора до 3 часов без подзарядки. Футляр заряжается через разъём Lightning. Двойное касание для начала или переключения на следующий трек. Серия 2019 г.', img:'https://cdn.citilink.ru/Z0A6zNbKalxfvwzX_R6A11AjYvzXuQt8QPwQWDiJIJA/resizing_type:fit/gravity:sm/width:1200/height:1200/plain/items/1781217_v01_b.jpg'},
    {id: '8', title:'Кресло игровое ZOMBIE VIKING 4 AERO, на колесиках, текстиль/эко.кожа, белый/синий/красный ', price:12990, description: 'Кресло игровое БЮРОКРАТ VIKING 4 AERO– сконструировано в соответствии со всеми современными игровыми тенденциями. Предназначено для увлеченных азартных людей, геймеров – всех тех, кто достаточно времени проводит за любимым хобби.Надежная крестовина из качественного пластика обеспечивает максимальную нагрузку до 120 кг. Нужную высоту можно отрегулировать с помощью газлифта. В спинке предусмотрен механизм качания, который можно зафиксировать углом от 90 до 140 градусов.Для долгого комфорта кресло снабжено 2 подушками для поддержания шейного и поясничного отделов.Подлокотники с мягкими тканевыми накладками можно настраивать в 2 положениях. Кресло обито искусственной кожей с тканевыми вставками черного цвета, поэтому не требует сложного ухода, такая обивка прослужит долго и надежно.', img:'https://main-cdn.sbermegamarket.ru/big2/hlr-system/-13/653/649/592/114/38/600001710284b0.jpg'},
    {id: '9', title:'Web-камера Logitech Pro Stream C922, черный/черный ', price:10780, description: 'Веб-камера Logitech® C922 Pro Stream предназначена для пользователей, которые часто работают с потоковым видео. Она обеспечивает потоковую трансляцию динамичного видео высокого качества в формате HD 1080p со скоростью 30 кадров в секунду. Высокая частота кадров (60 кадров в секунду) в разрешении 720p позволяет транслировать потоковое видео без задержек и искажений. Автофокусировка и коррекция освещения позволяют адаптироваться к полумраку, миганию электрических ламп или свету от множества компьютерных мониторов, обеспечивая стабильно высокую четкость.Два микрофона с каждой стороны объектива улавливают естественное звучание. Настольный штатив веб-камеры C922 может регулироваться по высоте до 18,5 см. Это позволяет подобрать наиболее выгодный ракурс для съемки.', img:'https://avatars.mds.yandex.net/get-mpic/5023672/img_id6358959727274241844.png/orig'},
    {id: '10', title:'Игровая консоль PlayStation 5 +Кабель питания (евровилка)', price:63000, description: 'Игровая консоль PlayStation 5 получила полностью переработанный дизайн с элегантными формами и красивой подсветкой. По всем параметрам приставка превосходит предыдущую модель — PS4.', img:'https://avatars.mds.yandex.net/i?id=6b6b40751386467e301203f648fceee985c91142-6998336-images-thumbs&n=13'},
    
]
const getTotalPrice = (items = {}) => {
    return items.reduce((acc, item) => {
         return acc += item.price
    }, 0)
   
}
export const Productlist =()=>{

    const [addedItems, setAddedItems] = useState([]);
    const {tg, queryId} = useTelegram();
    const onSendData = useCallback(() =>{
        const data = {
            products: addedItems,
            totalPrice: getTotalPrice(addedItems),
            queryId,
        }
        fetch('http://85.119.146.179:8000/web-data',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(data)
        })
    },[addedItems])
  
    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])
    const onAdd = (product) => {
        const alreadyAdded = addedItems.find(item => item.id === product.id);
        let newItems = [];
        if(alreadyAdded) {
            newItems = addedItems.filter(item => item.id !== product.id);
        }
        setAddedItems(newItems)

        if(newItems.length === 0) {
            tg.MainButton.hide();
        }else {
            tg.MainButton.show();
            tg.MainButton.setParams({
                text:`Купить ${getTotalPrice(newItems)}`
            })
        }

    }
   
    
    return(
        <div className={'list'}>
        {products.map(item => (
            <ProductItem
            product={item}
            onAdd={onAdd}
            className={'item'}
            />
        ))}
        </div>
    )}
