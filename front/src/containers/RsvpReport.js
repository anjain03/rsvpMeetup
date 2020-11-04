import * as React from 'react';
import { View, Text , Dimensions, SafeAreaView} from 'react-native';
import { Content } from 'native-base';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;


import { responsiveHeight } from 'react-native-responsive-dimensions';

export default function RsvpReport() {

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };

  const professionData = [
    {
      name: "Employed",
      people: 2,
      color: "rgba(131, 167, 234, 1)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Students",
      people: 5,
      color: "green",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
   
  ];

  const cityData = [
    {
      name: "Banglore",
      people: 150,
      color: "red",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Mumbai",
      people: 100,
      color: "yellow",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Delhi",
      people: 25,
      color: "green",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Hyderabad",
      people: 10,
      color: "blue",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Ahmedabad",
      people: 10,
      color: "black",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Kolkata",
      people: 0,
      color: "purple",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    
  ];

  
  const ageRangeData = [
    {
      name: "13-18",
      people: 2,
      color: "green",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "18-25",
      people: 5,
      color: "red",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "25+",
      people: 10,
      color: "blue",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
  ];


  return (
    <SafeAreaView  style={{ flex : 1}}>
    <Content style={{ flex: 1, backgroundColor : '#fff' }}>
    <View style={{flex :  1, justifyContent:'center',paddingTop : responsiveHeight(2), paddingHorizontal : responsiveHeight(3), borderBottomWidth : 1, borderBottomColor : '#000'}}>
    <Text style={{fontWeight : 'bold'}}>Total RSVP according to age range</Text>
      <PieChart
          data={ageRangeData}
          width={screenWidth - 80}
          height={220}
          chartConfig={chartConfig}
          accessor="people"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
    </View>   
      <View style={{flex :  1, paddingVertical : responsiveHeight(2),paddingHorizontal : responsiveHeight(3), borderBottomWidth : 1, borderBottomColor : '#000'}}>
        <Text style={{fontWeight : 'bold'}}>Total RSVP according to Locality</Text>
        <PieChart
          data={cityData}
          width={screenWidth - 50}
          height={220}
          chartConfig={chartConfig}
          accessor="people"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      </View>
      <View style={{flex :  1, paddingVertical : responsiveHeight(2),paddingHorizontal : responsiveHeight(3), borderBottomWidth : 1, borderBottomColor : '#000'}}>
        <Text style={{fontWeight : 'bold'}}>Total RSVP according to Profession</Text>
        <PieChart
          data={professionData}
          width={screenWidth - 50}
          height={220}
          chartConfig={chartConfig}
          accessor="people"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      </View>
    </Content>
    </SafeAreaView>
  );
}
