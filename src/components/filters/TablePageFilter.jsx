import React, { Component } from 'react'
import { Input, Button, Icon } from 'antd';
import Highlighter from "react-highlight-words"

export default class TablePageFilter extends Component {
    state = {
        searchText: '',
      };
      
    render() {      
          getColumnSearchProps = (dataIndex) => ({
            filterDropdown: ({
              setSelectedKeys, selectedKeys, confirm, clearFilters,
            }) => (
                <div style={{ padding: 8 }}>
                  <Input
                    ref={node => { this.searchInput = node; }}
                    placeholder={`Поиск по ключевым словам`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
                    style={{ width: 210, marginBottom: 8, display: 'block' }}
                  />
                  <Button
                    type="primary"
                    onClick={() => this.handleSearch(selectedKeys, confirm)}
                    icon="search"
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                  >
                    Поиск
                </Button>
                  <Button
                    onClick={() => this.handleReset(clearFilters)}
                    size="small"
                    style={{ width: 90 }}
                  >
                    Сброс
                </Button>
                </div>
              ),
            filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />,
            onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
            onFilterDropdownVisibleChange: (visible) => {
              if (visible) {
                setTimeout(() => this.searchInput.select());
              }
            },
            render: (text) => (
              <Highlighter
                highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                searchWords={[this.state.searchText]}
                autoEscape
                textToHighlight={text.toString()}
              />
            ),
          })
        
          handleSearch = (selectedKeys, confirm) => {
            confirm();
            this.setState({ searchText: selectedKeys[0] });
          }
        
          handleReset = (clearFilters) => {
            clearFilters();
            this.setState({ searchText: '' });
          }
    }
}