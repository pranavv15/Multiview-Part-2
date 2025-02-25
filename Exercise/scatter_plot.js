function scatter_plot(X,Y,markersize,
  ColorData,
  axis_key,
  title="",
  xLabel="",
  yLabel="",
  legend =[],
  legendColor =[],
  margin = 100
  
  )
{
  let axis = d3.select(`#${axis_key}`)
  axis.selectAll("*").remove()



function data_axis_pad(data,pad=.05){
return [data[0]-pad*data[0], data[1]+pad*data[1] ]
}

let xScale= d3.scaleLinear().domain(data_axis_pad(d3.extent(X))).range([0+margin,1000-margin])
let yScale= d3.scaleLinear().domain(data_axis_pad(d3.extent(Y))).range([1000-margin,0 + margin])
let rScale= d3.scaleLinear().domain(d3.extent(markersize)).range([5,15])
let colorScale= d3.scaleLinear().domain(d3.extent(ColorData)).range(['red','green'])

axis.selectAll('.markers')
.data(X)
.enter()
.append('g')
.attr("class","markers")
.attr('transform', function(d,i) {
return `translate(${xScale(X[i])}, ${yScale(Y[i])})`})
.append('circle').attr("r",function(d,i) { return rScale(markersize[i])})
.style("fill",function (d,i){return colorScale(ColorData[i])})
.on("mouseover",function(d){
  console.log(this)
  d3.select(this)
  // console.log(this)
  .attr("stroke","black")
  .attr("stroke-width",2)
  .attr("r",function(d,i) { return rScale(markersize[i]*1.3)})
  .attr("opacity",0.5)
  // .attr("text",function(d,i){return markersize[i]})
  // .style("font-size","20pt")
  // // console.log(this)

})
.on("mouseout",function(){
  d3.select(this)
  .attr("stroke",null)
  .attr("r",function(d,i) { return rScale(markersize[i])})
  .attr("opacity",1)
})


// x and y Axis function
let x_axis = d3.axisBottom(xScale).ticks(4)
let y_axis = d3.axisLeft(yScale).ticks(4)
//X Axis
axis.append("g").attr("class","axis")
.attr("transform", `translate(${0},${1000-margin})`)
.call(x_axis)
// Y Axis
axis.append("g").attr("class","axis")
.attr("transform", `translate(${margin},${0})`)
.call(y_axis)
// Labels
axis.append("g").attr("class","label")
    .attr("transform", `translate(${500},${1000-10})`)
    .append("text")
    .attr("class","label")
    .attr("text-anchor","middle")
    .text(xLabel)

axis.append("g")
.attr("transform", `translate(${35},${500}) rotate(270)`)
.append("text")
.attr("class","label")
.attr("text-anchor","middle")
.text(yLabel)



// Title
axis.append('text')
.attr("class","text")
.attr('x',500)
.attr('y',80)
.attr("text-anchor","middle")
.text(title)
.attr("class","plotTitle")

// legend
if (legend.length>0){
  legend.forEach(
  function (d,i){
  let space = 50
  let lgnd = axis.append("g").attr('transform',`translate(${900},${i*50 + space})`);
  lgnd.append('rect').attr('width',function (d){return 40})
    .attr("class","legend")
    .attr('height',function (d){return 40})
    .attr('fill',function (d){
      return colorScale(legendColor[i])
    })
  .attr("class",d)
  lgnd.append('text').attr("class","legend").attr("dx","-120").attr("dy","30").text(d)
      .attr("font-size",25).attr("font-family","sans-serif")
  
  })


}
}