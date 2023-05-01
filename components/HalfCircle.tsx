import React from "react";
import { View } from "react-native";

import { RADIUS } from "./Constants";

interface HalfCircleProps {
  percent: number
  workOrRest: string
  color: string
  leftBorderColor: string
  rotation: string
}

export default function HalfCircle ({ percent, workOrRest, color, leftBorderColor, rotation="0deg" }: HalfCircleProps) {
  // console.log(workOrRest)
  return(
    <View style={{
      height: RADIUS,
      width: RADIUS * 2,
      overflow: "hidden",
      // borderColor: "orange",
      // borderWidth: 1,
      transform: [
        { rotate: rotation },
      ],
    }}>
      <View style={{
        backgroundColor: color,
        // backgroundColor: "000000",
        borderWidth: 9,
        borderColor: leftBorderColor ? leftBorderColor
          : workOrRest == "work" && percent >= 0.5 ? "#FAFF00"
          : workOrRest == "rest" && percent >= 0.5 ? "#2D9CDB"
          : workOrRest == "complete" ? "#6FCF97"
          : "#828282",
        width: RADIUS * 2,
        height: RADIUS * 2,
        borderRadius: RADIUS,
        // opacity: 0.7
      }}/>
    </View>
  )
};
