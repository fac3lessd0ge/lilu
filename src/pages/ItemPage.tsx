import axios from 'axios';
import * as React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { DropDownList } from '../components/DropdownList/DropdownList';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { ImageSlider } from '../components/ImageSlider/ImageSlider';

const ItemPageFlexBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const StyledItemImage = styled.img`
  width: 100%;
  max-width: 600px;
  max-height: 300px;
  height: auto;
  border-radius: 5px;
  margin: 0 auto;
`;

const DropDownWrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;

const APIImagesResponse = [
  [
    "https://sun9-80.userapi.com/impg/-xjjujZbHs2zD_TX4RLS5tOZLAhWZzd2fuIOyw/DHoV4ipSeXo.jpg?size=810x1080&quality=96&sign=0278d3232995e1456b04cc593a284666&type=album",
    "https://sun1-30.userapi.com/impg/BNx3jxToCgo6xo-jWotX-q8ewTsbgNo-YyfvOQ/wdSdWP6Vaww.jpg?size=225x225&quality=96&sign=33607190eca5a29f92d8ba05ecf0bc29&type=album",
    "https://sun9-60.userapi.com/impg/Xjffdcv14trEjqYAyrhwri0ZfBQkDkYbMguSOw/1bcHgoFf4zo.jpg?size=1117x1280&quality=95&sign=ec2a4d69fb1a34f1ff1fc9e15cae32be&type=album",
    "https://sun9-50.userapi.com/impg/qk2Adi_xTY4tau40EPUNFWCf8En5S351rKWzdg/h5oi8g-BMT8.jpg?size=1440x1920&quality=95&sign=7ef11bbb7cd618be2d227220e1df5b80&type=album",
    "https://liluwax.ru/wp-content/uploads/2022/01/01-1121_09-01-1120_10.jpg",
    "https://sun9-85.userapi.com/impg/cTspyLOcB33kTsyweaLQWO6vrrbgeE6AsY3G6Q/JhSnCE88rCk.jpg?size=640x641&quality=95&sign=06e53b26ed7245da097e23fa279f26f0&type=album",
    "https://sun9-68.userapi.com/impg/KveuRKSeovb3PjUHIBrowUdTBkJqHdfsh1EYlw/kHHP9EY2W_w.jpg?size=604x544&quality=96&sign=5e6ee32469e9ce69659de546e985e483&type=album"
  ],
  [
    "https://sun9-47.userapi.com/impg/kt-K6EhwUkjfyvgYHjunbJY3lwSjMSM8YOsUtg/fbGbKPLxvpc.jpg?size=576x358&quality=95&sign=80200a5d950f866d93b740cb1957a772&type=album",
    "https://sun1-30.userapi.com/impg/BNx3jxToCgo6xo-jWotX-q8ewTsbgNo-YyfvOQ/wdSdWP6Vaww.jpg?size=225x225&quality=96&sign=33607190eca5a29f92d8ba05ecf0bc29&type=album",
    "https://sun9-60.userapi.com/impg/Xjffdcv14trEjqYAyrhwri0ZfBQkDkYbMguSOw/1bcHgoFf4zo.jpg?size=1117x1280&quality=95&sign=ec2a4d69fb1a34f1ff1fc9e15cae32be&type=album",
    "https://sun9-50.userapi.com/impg/qk2Adi_xTY4tau40EPUNFWCf8En5S351rKWzdg/h5oi8g-BMT8.jpg?size=1440x1920&quality=95&sign=7ef11bbb7cd618be2d227220e1df5b80&type=album",
    "https://liluwax.ru/wp-content/uploads/2022/01/01-1121_09-01-1120_10.jpg",
    "https://sun9-85.userapi.com/impg/cTspyLOcB33kTsyweaLQWO6vrrbgeE6AsY3G6Q/JhSnCE88rCk.jpg?size=640x641&quality=95&sign=06e53b26ed7245da097e23fa279f26f0&type=album",
    "https://sun9-68.userapi.com/impg/KveuRKSeovb3PjUHIBrowUdTBkJqHdfsh1EYlw/kHHP9EY2W_w.jpg?size=604x544&quality=96&sign=5e6ee32469e9ce69659de546e985e483&type=album"
  ],
  [
    "https://sun9-18.userapi.com/impg/JH7uGy0B-jmsrUqkwb-0YVRep_dc5QoAgzDxOA/ckeIvLnlqsg.jpg?size=604x482&quality=96&sign=19c23242624f4d5c76de051ef01757bf&type=album",
    "https://sun1-30.userapi.com/impg/BNx3jxToCgo6xo-jWotX-q8ewTsbgNo-YyfvOQ/wdSdWP6Vaww.jpg?size=225x225&quality=96&sign=33607190eca5a29f92d8ba05ecf0bc29&type=album",
    "https://sun9-60.userapi.com/impg/Xjffdcv14trEjqYAyrhwri0ZfBQkDkYbMguSOw/1bcHgoFf4zo.jpg?size=1117x1280&quality=95&sign=ec2a4d69fb1a34f1ff1fc9e15cae32be&type=album",
    "https://sun9-50.userapi.com/impg/qk2Adi_xTY4tau40EPUNFWCf8En5S351rKWzdg/h5oi8g-BMT8.jpg?size=1440x1920&quality=95&sign=7ef11bbb7cd618be2d227220e1df5b80&type=album",
    "https://liluwax.ru/wp-content/uploads/2022/01/01-1121_09-01-1120_10.jpg",
    "https://sun9-85.userapi.com/impg/cTspyLOcB33kTsyweaLQWO6vrrbgeE6AsY3G6Q/JhSnCE88rCk.jpg?size=640x641&quality=95&sign=06e53b26ed7245da097e23fa279f26f0&type=album",
    "https://sun9-68.userapi.com/impg/KveuRKSeovb3PjUHIBrowUdTBkJqHdfsh1EYlw/kHHP9EY2W_w.jpg?size=604x544&quality=96&sign=5e6ee32469e9ce69659de546e985e483&type=album"
  ],
  [
    "https://sun9-30.userapi.com/impg/ApOi5L4W5SiaC9HXPIaB3bbV_bYaxpHnJU30Ew/IjQCWgpJSW4.jpg?size=1080x785&quality=96&sign=8c90791f477eb8723f2528f6ee9c7ae6&type=album",
    "https://sun1-30.userapi.com/impg/BNx3jxToCgo6xo-jWotX-q8ewTsbgNo-YyfvOQ/wdSdWP6Vaww.jpg?size=225x225&quality=96&sign=33607190eca5a29f92d8ba05ecf0bc29&type=album",
    "https://sun9-60.userapi.com/impg/Xjffdcv14trEjqYAyrhwri0ZfBQkDkYbMguSOw/1bcHgoFf4zo.jpg?size=1117x1280&quality=95&sign=ec2a4d69fb1a34f1ff1fc9e15cae32be&type=album",
    "https://sun9-50.userapi.com/impg/qk2Adi_xTY4tau40EPUNFWCf8En5S351rKWzdg/h5oi8g-BMT8.jpg?size=1440x1920&quality=95&sign=7ef11bbb7cd618be2d227220e1df5b80&type=album",
    "https://liluwax.ru/wp-content/uploads/2022/01/01-1121_09-01-1120_10.jpg",
    "https://sun9-85.userapi.com/impg/cTspyLOcB33kTsyweaLQWO6vrrbgeE6AsY3G6Q/JhSnCE88rCk.jpg?size=640x641&quality=95&sign=06e53b26ed7245da097e23fa279f26f0&type=album",
    "https://sun9-68.userapi.com/impg/KveuRKSeovb3PjUHIBrowUdTBkJqHdfsh1EYlw/kHHP9EY2W_w.jpg?size=604x544&quality=96&sign=5e6ee32469e9ce69659de546e985e483&type=album"
  ],
  [
    "https://sun9-41.userapi.com/impg/wHsKN4kbKv-dSEXy3KzHoZcMnI9UVogNwgnvCA/eRxxZ2p_5HM.jpg?size=1080x1055&quality=96&sign=a70dad1d3684bf6052cff49ff92bdca9&type=album",
    "https://sun1-30.userapi.com/impg/BNx3jxToCgo6xo-jWotX-q8ewTsbgNo-YyfvOQ/wdSdWP6Vaww.jpg?size=225x225&quality=96&sign=33607190eca5a29f92d8ba05ecf0bc29&type=album",
    "https://sun9-60.userapi.com/impg/Xjffdcv14trEjqYAyrhwri0ZfBQkDkYbMguSOw/1bcHgoFf4zo.jpg?size=1117x1280&quality=95&sign=ec2a4d69fb1a34f1ff1fc9e15cae32be&type=album",
    "https://sun9-50.userapi.com/impg/qk2Adi_xTY4tau40EPUNFWCf8En5S351rKWzdg/h5oi8g-BMT8.jpg?size=1440x1920&quality=95&sign=7ef11bbb7cd618be2d227220e1df5b80&type=album",
    "https://liluwax.ru/wp-content/uploads/2022/01/01-1121_09-01-1120_10.jpg",
    "https://sun9-85.userapi.com/impg/cTspyLOcB33kTsyweaLQWO6vrrbgeE6AsY3G6Q/JhSnCE88rCk.jpg?size=640x641&quality=95&sign=06e53b26ed7245da097e23fa279f26f0&type=album",
    "https://sun9-68.userapi.com/impg/KveuRKSeovb3PjUHIBrowUdTBkJqHdfsh1EYlw/kHHP9EY2W_w.jpg?size=604x544&quality=96&sign=5e6ee32469e9ce69659de546e985e483&type=album"
  ],
  [
    "https://sun9-85.userapi.com/impg/mMjZ2OzVBEcz39Bd_rUOD0iJAmzCCMAKy-8rTw/LziUZI6-IZQ.jpg?size=1079x821&quality=96&sign=05ce1e0c7bd003a426637a539bc9aa12&type=album",
    "https://sun1-30.userapi.com/impg/BNx3jxToCgo6xo-jWotX-q8ewTsbgNo-YyfvOQ/wdSdWP6Vaww.jpg?size=225x225&quality=96&sign=33607190eca5a29f92d8ba05ecf0bc29&type=album",
    "https://sun9-60.userapi.com/impg/Xjffdcv14trEjqYAyrhwri0ZfBQkDkYbMguSOw/1bcHgoFf4zo.jpg?size=1117x1280&quality=95&sign=ec2a4d69fb1a34f1ff1fc9e15cae32be&type=album",
    "https://sun9-50.userapi.com/impg/qk2Adi_xTY4tau40EPUNFWCf8En5S351rKWzdg/h5oi8g-BMT8.jpg?size=1440x1920&quality=95&sign=7ef11bbb7cd618be2d227220e1df5b80&type=album",
    "https://liluwax.ru/wp-content/uploads/2022/01/01-1121_09-01-1120_10.jpg",
    "https://sun9-85.userapi.com/impg/cTspyLOcB33kTsyweaLQWO6vrrbgeE6AsY3G6Q/JhSnCE88rCk.jpg?size=640x641&quality=95&sign=06e53b26ed7245da097e23fa279f26f0&type=album",
    "https://sun9-68.userapi.com/impg/KveuRKSeovb3PjUHIBrowUdTBkJqHdfsh1EYlw/kHHP9EY2W_w.jpg?size=604x544&quality=96&sign=5e6ee32469e9ce69659de546e985e483&type=album"
  ],
  [
    "https://sun9-85.userapi.com/impg/mMjZ2OzVBEcz39Bd_rUOD0iJAmzCCMAKy-8rTw/LziUZI6-IZQ.jpg?size=1079x821&quality=96&sign=05ce1e0c7bd003a426637a539bc9aa12&type=album",
    "https://sun1-30.userapi.com/impg/BNx3jxToCgo6xo-jWotX-q8ewTsbgNo-YyfvOQ/wdSdWP6Vaww.jpg?size=225x225&quality=96&sign=33607190eca5a29f92d8ba05ecf0bc29&type=album",
    "https://sun9-60.userapi.com/impg/Xjffdcv14trEjqYAyrhwri0ZfBQkDkYbMguSOw/1bcHgoFf4zo.jpg?size=1117x1280&quality=95&sign=ec2a4d69fb1a34f1ff1fc9e15cae32be&type=album",
    "https://sun9-50.userapi.com/impg/qk2Adi_xTY4tau40EPUNFWCf8En5S351rKWzdg/h5oi8g-BMT8.jpg?size=1440x1920&quality=95&sign=7ef11bbb7cd618be2d227220e1df5b80&type=album",
    "https://liluwax.ru/wp-content/uploads/2022/01/01-1121_09-01-1120_10.jpg",
    "https://sun9-85.userapi.com/impg/cTspyLOcB33kTsyweaLQWO6vrrbgeE6AsY3G6Q/JhSnCE88rCk.jpg?size=640x641&quality=95&sign=06e53b26ed7245da097e23fa279f26f0&type=album",
    "https://sun9-68.userapi.com/impg/KveuRKSeovb3PjUHIBrowUdTBkJqHdfsh1EYlw/kHHP9EY2W_w.jpg?size=604x544&quality=96&sign=5e6ee32469e9ce69659de546e985e483&type=album"
  ],
  
]

export const ItemPage: React.FC = () => {
  const { id } = useParams();
  const [itemInfo, SetItemInfo] = React.useState<any | null>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [images, setImages] = React.useState(APIImagesResponse[0]);
  
  React.useEffect(() => {
    const fetchItemInfo = async () => {
      const { data } = await axios.get(process.env.REACT_APP_BASE_URL + `/item/${id}`)
      console.log(data);
      SetItemInfo(data);
    }
    fetchItemInfo();
  }, [])

  React.useEffect(() => {
    setImages(APIImagesResponse[selectedIndex])
  }, [selectedIndex])

  return (
    <ItemPageFlexBox>
      {itemInfo && <>
        <ImageSlider images={images}/>
        <DropDownWrapper>
          <DropDownList onSelect={setSelectedIndex} variants={itemInfo.images.map((elem: any) => elem.name)}/>
        </DropDownWrapper>
      </>}
      {itemInfo && itemInfo.description}
    </ItemPageFlexBox>
  )
}