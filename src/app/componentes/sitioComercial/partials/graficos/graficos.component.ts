import { Component, Input, OnInit } from '@angular/core';
import * as d3 from 'd3'
import { PeticionesService } from 'src/app/services/requests/peticiones.service';
@Component({
  selector: 'graficos',
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.css']
})
export class GraficosComponent implements OnInit {
  @Input() url: string = ""
  @Input() titulo:  string = ""
  private data: any[] = []
  private margin = 50;
  private width = Math.abs(window.screen.width - 820);
  private height = Math.abs(window.screen.height - 220);
  private radius = Math.min(this.width, this.height) / 2 - this.margin;
  private colors: any;
  private svg: any;
  private meses=["Enero","Febrero","Marzo","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]
  constructor(private service: PeticionesService) { }

  ngOnInit(): void {
    this.peticion()

  }

  private peticion() {
    this.service.peticionGet("http://localhost:8000/api/grafico-" + this.url).subscribe(res => {
      if (this.url == "pie") {
        this.createSvg(this.url, 50)
        this.createColors()
        for (let elemento in res.data) {
          this.data.push({ name: elemento, precio: Number(res.data[elemento]) })
        }
        this.drawChart(this.data)
      }
      else if (this.url == "barras") {
        this.createSvg_Charts(this.url)
        for (let elemento in res.data) {
          this.data.push({ name: res.data[elemento].nombre, precio: res.data[elemento].precio })
        }
        this.drawBars(this.data)
      }
      else if (this.url == "puntos") {
        console.log(res)
        this.createSvg_Charts(this.url)
        for(let elemento in res.data){
          this.data.push(res.data[elemento])
        }
        this.drawPlot(this.data)
      }

    })
  }
  private createSvg(tipo: any, adicional: any): void {
    this.svg = d3.select("figure#" + tipo)
      .append("svg")
      .attr("width", this.width - adicional)
      .attr("height", this.height + (this.margin * 2) + adicional)
      .append("g")
      .attr(
        "transform",
        "translate(" + (this.width - adicional * 2) / 2 + "," + this.height / 2 + ")"
      );
  }
  private createSvg_Charts(tipo: any): void {
    this.svg = d3.select("figure#" + tipo)
      .append("svg")
      .attr("width", this.width + (this.margin * 2))
      .attr("height", this.height + (this.margin * 2))
      .append("g")
      .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
  }

  private createColors(): void {
    this.colors = d3.scaleOrdinal()
      .domain(this.data.map((d: any) => d.precio.toString()))
      .range(["#c7d3ec", "#ce1c49", "#f2154c", "#780093", "#5a6782", "#009688", "#f48d49"]);
  }

  private drawChart(data: any): void {
    const pie = d3.pie<any>().value((d: any) => Number(d.precio));
    this.svg
      .selectAll('pieces')
      .data(pie(data))
      .enter()
      .append('path')
      .attr('d', d3.arc()
        .innerRadius(0)
        .outerRadius(this.radius)
      )
      .attr('fill', (d: any, i: any) => (this.colors(i)))
      .attr("stroke", "#121926")
      .style("stroke-width", "1px");

    const labelLocation = d3.arc()
      .innerRadius(100)
      .outerRadius(this.radius);

    this.svg
      .selectAll('pieces')
      .data(pie(data))
      .enter()
      .append('text')
      .text((d: any) => "stock:" + d.data.precio)
      .attr("transform", (d: any) => "translate(" + d3.arc().innerRadius(this.radius - 175).outerRadius(this.radius).centroid(d) + ")rotate(-60)")
      .style("text-anchor", "middle")
      .style("font-size", 14);
    this.svg
      .append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 11)
      .attr("text-anchor", "middle")
      .selectAll("text")
      .data(pie(data))
      .join("text")
      .attr("transform", (d: any) => `translate(${d3.arc().innerRadius(this.radius - 75).outerRadius(this.radius).centroid(d)})`)
      .call((text: any) => text.append("tspan")
        .attr("y", "-0.4em")
        .attr("font-weight", "bold")
        .text((d: any) => d.data.name))

  }

  private drawBars(data: any[]): void {
    const x = d3.scaleBand()
      .range([0, this.width])
      .domain(data.map((d: any) => d.name))
      .padding(0.2);
    this.svg.append("g")
      .attr("transform", "translate(0," + (this.height - 75) + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    const y = d3.scaleLinear()
      .domain([0, 50])
      .range([this.height - 75, 0]);

    this.svg.append("g")
      .call(d3.axisLeft(y));

    this.svg.selectAll("bars")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d: any) => x(d.name))
      .attr("y", (d: any) => y(d.precio))
      .attr("width", x.bandwidth())
      .attr("height", (d: any) => this.height - y(d.precio) - 75)
      .attr("fill", "#009688");
  }

  private drawPlot(data: any): void {
    const x = d3.scaleBand()
      .domain(data.map((d: any) => d.mes))
      .range([0, this.width]);

    this.svg.append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    const y = d3.scaleLinear()
      .domain([0, 20])
      .range([this.height, 0]);
    this.svg.append("g")
      .call(d3.axisLeft(y));

    const dots = this.svg.append('g').attr("transform", "translate(15,0)")
    dots.selectAll("dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", (d: any) => x(d.mes))
      .attr("cy", (d: any) => y(d.cantidad))
      .attr("r", 7)
      .style("opacity", .5)
      .style("fill", "#69b3a2");

    dots.selectAll("text")
      .data(this.data)
      .enter()
      .append("text")
      .text((d: any) => d.mes)
      .attr("x", (d: any) => x(d.mes))
      .attr("y", (d: any) => y(d.cantidad))
  }
}
