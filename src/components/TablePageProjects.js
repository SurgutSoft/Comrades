import React, { Component } from 'react'
import { Table, Divider, Tag, Input, Button, Icon } from 'antd';
import Highlighter from "react-highlight-words";

let data = [{
  key: '1',
  name: 'John Brown',
  nameProject: "Рванные труханы",
  dateFrom: "12-09-2019",
  describe: 'best of the best',
  tags: ['java', 'ReactJS'],
}, {
  key: '2',
  name: 'Jim Green',
  dateFrom: "12-02-2019",
  nameProject: "Гугел",
  age: 42,
  describe: 'best of the best',
  tags: ['loser'],
}, {
  key: '3',
  name: 'Joe Black',
  dateFrom: "12-04-2019",
  nameProject: "Just do IT!",
  age: 32,
  describe: 'Sbest of the best',
  tags: ['FullStack', 'teacher'],
}, {
  key: '11',
  name: 'John Brown',
  dateFrom: "12-06-2019",
  nameProject: "Рванные труханы",
  age: 32,
  describe: 'best of the best',
  tags: ['java', 'ReactJS'],
}, {
  key: '21',
  name: 'Jim Green',
  dateFrom: "12-05-2019",
  nameProject: "Гугел",
  age: 42,
  describe: 'best of the best',
  tags: ['loser'],
}, {
  key: '31',
  name: 'Joe Black',
  dateFrom: "12-09-2019",
  nameProject: "Just do IT!",
  age: 32,
  describe: 'best of the best',
  tags: ['FullStack', 'teacher'],
}, {
  key: '12',
  name: 'John Brown',
  dateFrom: "12-09-2017",
  nameProject: "Рванные труханы",
  age: 32,
  describe: 'best of the best',
  tags: ['java', 'ReactJS'],
}, {
  key: '22',
  name: 'Jim Green',
  dateFrom: "12-06-2019",
  nameProject: "Гугел",
  age: 42,
  describe: 'Lbest of the best',
  tags: ['loser'],
}, {
  key: '32',
  name: 'Joe Black',
  nameProject: "Just do IT!",
  dateFrom: "12-02-2019",
  age: 32,
  describe: 'Sbest of the best',
  tags: ['FullStack', 'teacher'],
}, {
  key: '13',
  name: 'John Brown',
  dateFrom: "12-09-2019",
  nameProject: "Рванные труханы",
  age: 32,
  describe: 'best of the best',
  tags: ['java', 'ReactJS'],
}, {
  key: '23',
  name: 'Jim Green',
  dateFrom: "12-09-2019",
  nameProject: "Гугел",
  age: 42,
  describe: 'best of the best',
  tags: ['loser'],
}, {
  key: '33',
  name: 'Joe Black',
  dateFrom: "12-07-2019",
  nameProject: "Just do IT!",
  age: 32,
  describe: 'best of the best',
  tags: ['FullStack', 'teacher'],
}];

for (let i = data.length + 1; i < 250; i++) {
  data[i] = {
    key: i,
    name: 'John Brown',
    nameProject: "Рванные труханы",
    dateFrom: "12-09-2019",
    describe: 'best of the best',
    tags: ['java', 'ReactJS'],
  }
}

export default class TablePageProjects extends Component {
  state = {
    searchText: '',
  };

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

  showModalForm = () => {

  }

  renderTitle = () => {
    return (
        <div>
            {`Количество камрадов (${data.length})`}
            <Button style={{marginLeft: "5px"}} onClick={this.showModalForm}>
                Создать новый проект
            </Button>
        </div>
    )
}

  render() {
    const columns = [{
      title: 'Дата начала',
      dataIndex: 'dateFrom',
      key: 'dateFrom',
      sorter: (a, b) => a.dateFrom - b.dateFrom,
      sortDirections: ['descend', 'ascend'],
    }, {
      title: 'Организатор',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: 'Название проекта',
      dataIndex: 'nameProject',
      key: 'nameProject',
      ...this.getColumnSearchProps('nameProject'),
    }, {
      title: 'Описание проекта',
      dataIndex: 'describe',
      key: 'describe',
    }, {
      title: 'Ищем',
      key: 'tags',
      dataIndex: 'tags',
      ...this.getColumnSearchProps('tags'),
      render: tags => (
        <span>
          {tags.map(tag => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return <Tag color={color} key={tag}>{tag.toUpperCase()}</Tag>;
          })}
        </span>
      ),
    }, {
      title: '',
      key: 'actionJoin',
      render: (text, record) => (
        <span>
          <a href="javascript:;">Подать заявку в {record.nameProject}</a>
        </span>
      ),
    },
    {
      title: '',
      key: 'actionMore',
      render: (text, record) => (
        <span>
          <a href="javascript:;">Подробнее...</a>
        </span>
      ),
    }];
    return (
      <Table
        className="tableList"
        columns={columns}
        dataSource={data}
        title={this.renderTitle}
      />
    )
  }

}
