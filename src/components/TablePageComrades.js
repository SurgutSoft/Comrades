import React, { Component } from 'react'
import { Table, Tag, Input, Button, Icon } from 'antd';
import Highlighter from "react-highlight-words";

let data = [{
    key: '1',
    photo: <img src="https://nt.tj/wp-files/code.tj_-455x300.jpg" width="100px" height="100px"/>,
    name: 'Витя Кузьмин',
    dateFrom: "12-09-2019",
    age: 21,
    describe: 'Ищу небольшой проект для получения опыта командной разработки. Имея базовые навыки в Java - 1.5 года',
    tags: ['java', 'SQL', "bd MySQL"],
}, {
    key: '2',
    name: 'Комрад Артем',
    photo: <img src="https://proglib.io/wp-content/uploads/-000//1/1*iSos8eYodc_ppD4qqBxbcQ.jpeg" width="100px" height="100px"/>,
    dateFrom: "12-02-2019",
    age: 27,
    describe: `Ищу опытную команду в стартапе. Имею продвинутные навыки FrontEnd, готов взять на себя функции тим лида по фронту.
            ДЕНЬГИ НЕ ПРЕДЛОГАТЬ, только за долю в перспективном проекте!!!`,
    tags: ['JavaScript', "Node.JS", "Express", "ReactJS", "MeteorJS", "GraphQL/REST - запросы", "MongoDB / MySQL db", "SQL"],
}, {
    key: '3',
    name: 'Джеки Чан',
    photo: <img src="https://globalsib.com/wp-content/uploads/2017/06/323.jpg" width="100px" height="100px"/>,
    dateFrom: "12-04-2019",
    age: 64,
    describe: 'А я в фильмах снимаюсь. опыт кунг-фу более 20 лет',
    tags: ['Сан сэй', 'каратэ', 'Кунг-фу'],
}];


export default class TablePageComrades extends Component {
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
                <Button style={{ marginLeft: "5px" }} onClick={this.showModalForm}>
                    Создать анкету
              </Button>
            </div>
        )
    }

    render() {
        const columns = [{
            title: 'Дата публикации',
            dataIndex: 'dateFrom',
            key: 'dateFrom',
            sorter: (a, b) => a.dateFrom - b.dateFrom,
            sortDirections: ['descend', 'ascend'],
        }, {
            title: 'Фото',
            dataIndex: 'photo',
            key: 'photo',
        }, {
            title: 'ФИО',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: 'краткое представление',
            dataIndex: 'describe',
            key: 'describe',
        }, {
            title: 'основные умения',
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
            key: 'actionInvite',
            render: (text, record) => (
                <span>
                    <a href="javascript:;">Пригласить</a>
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
