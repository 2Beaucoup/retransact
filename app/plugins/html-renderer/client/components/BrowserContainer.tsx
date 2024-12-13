import {
  ArrowLeftOutlined,
  CopyOutlined,
  MoreOutlined,
  ReloadOutlined,
  ZoomInOutlined,
} from '@ant-design/icons'
import { Button, Input, Space } from 'antd'
import { styled } from 'styled-components'

type Props = {
  children: any
  search?: string
}

const WindowControls = styled.div`
  background-color: #2b2b2b;
  height: 32px;
  display: flex;
  align-items: center;
  padding: 0 10px;
`

const NavigationBar = styled.div`
  display: flex;
  align-items: center;
  background-color: #3c3c3c;
  padding: 8px 10px;
  width: 100%;
  gap: 4px;
`

const ButtonClose = styled.div`
  height: 12px;
  width: 12px;
  border-radius: 50%;
  background-color: #ff5f57;
`

const ButtonReduce = styled.div`
  height: 12px;
  width: 12px;
  border-radius: 50%;
  background-color: #ffbd2e;
`

const ButtonFullscreen = styled.div`
  height: 12px;
  width: 12px;
  border-radius: 50%;
  background-color: #28c940;
`

const SearchBar = styled(Input)`
  flex: 1;
  margin-left: 10px;
  border: none;
  border-radius: 20px;
`

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  margin: 0 auto;
  background-color: #3c3c3c;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  background: #2b2b2b;
  color: 'white';
`

export const BrowserContainer = ({ children, search }: Props) => {
  return (
    <MainContainer>
      <WindowControls>
        <div style={{ display: 'flex', gap: '6px' }}>
          <ButtonClose />
          <ButtonReduce />
          <ButtonFullscreen />
        </div>
      </WindowControls>

      <NavigationBar>
        <Space>
          <Button
            icon={<ArrowLeftOutlined style={{ color: 'gray' }} />}
            type="text"
            size="small"
          />
          <Button
            icon={<ReloadOutlined style={{ color: 'gray' }} />}
            type="text"
            size="small"
          />
        </Space>
        <SearchBar readOnly value={search} />
        <Button
          icon={<CopyOutlined style={{ color: 'gray' }} />}
          type="text"
          size="small"
        />
        <Button
          icon={<ZoomInOutlined style={{ color: 'gray' }} />}
          type="text"
          size="small"
        />
        <Button
          icon={<MoreOutlined style={{ color: 'gray' }} />}
          type="text"
          size="small"
        />
      </NavigationBar>
      {children}
    </MainContainer>
  )
}
