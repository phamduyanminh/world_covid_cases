import React from 'react';
import axios from 'axios'
import {Table as AntTable, Badge, Menu, Dropdown, Space} from "antd" // change Table to AntTable
import {DownOutlined} from '@ant-design/icons'

/*
*Bugs: expands nhiều rows sẽ bị lỗi share data
*/


class Table extends React.Component {
    state = {
        selectedCountry:'',
        countryArray:[],
        countryData:[]
    }

    menu = (
      <Menu>
        <Menu.Item>Action 1</Menu.Item>
      </Menu>
    )

    expandedRowRender = () => {
      const columns = [
        {title: 'Confirmed', dataIndex: 'confirmed', key: 'confirmed', },
        {title: 'Deaths', dataIndex: 'deaths', key: 'deaths'},
        {title: 'LastUpdate', dataIndex: 'lastUpdate', key: 'lastUpdate'}
      ]
      return <AntTable dataSource={this.state.countryData} columns={columns} pagination={false}/>
    }


    handleSelectedCountry(e){
      this.setState({selectedCountry: e});
      axios.get(`https://covid19.mathdro.id/api/countries/${e}`)
      .then(res => {
        const confirmedValue = res.data.confirmed.value;
        const deathsValue = res.data.deaths.value;
        const updateValue = res.data.lastUpdate;
        
        const countryDataObj = {
          confirmed: confirmedValue,
          deaths: deathsValue,
          lastUpdate: updateValue,
          key: e
        }

        this.setState({
          countryData: [countryDataObj]
        })
      })
    }
      
    countryColumns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'ISO2',
          dataIndex: 'iso2',
          key: 'iso2',
        },
        {
          title: 'ISO3',
          dataIndex: 'iso3',
          key: 'iso3',
        },
      ];

    getCountryData(){
        axios.get(`https://covid19.mathdro.id/api/countries`)
        .then(res => {
                const countries = res.data.countries.map(country => ({key: country.iso3,...country})); 
                this.setState({countryArray: countries});
            })
    }

    componentDidMount(){
        this.getCountryData();
    }

    render(){
        return(
            <div>
                <AntTable className="components-table-demo-nested" onExpand={(e, record) => this.handleSelectedCountry(record.iso3)} dataSource={this.state.countryArray} columns={this.countryColumns}  expandable={{ expandedRowRender:this.expandedRowRender }} />;
            </div>
        )
    }
}

export default Table;