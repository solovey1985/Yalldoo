
import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    ViewChild,
    AfterViewInit,
    Input,
    ElementRef,
    OnChanges,
    SimpleChanges,
    SimpleChange,
    Output,
    EventEmitter,
    TestabilityRegistry
} from "@angular/core";
import { IHereSearchResponse, IHerePosition, EHereLocalityType, EHereResultType } from "app/_models/geo/address.model";
import { Config } from "app/_configs/config";
import LocationDto from "app/_models/location.dto";


declare var H: any;
@Component({
    selector: "app-map",
    templateUrl: "./map.component.html",
    styleUrls: ["./map.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapComponent implements AfterViewInit, OnChanges {
    private platform: any;

    @ViewChild("map")
    public mapElement: ElementRef;

    @Input()
    canChangePin = true;

    @Input()
    public lat: any;

    @Input()
    public lng: any;

    @Input()
    public width: "300px";

    @Input()
    public place: LocationDto;

    @Input()
    public height: any;

    @Output()
    locationSet: EventEmitter<IHerePosition> = new EventEmitter<IHerePosition>();
    map: any;

    public constructor() {
        this.platform = new H.service.Platform({
            apikey: Config.geoApiKey
        });

    }

    ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
        for (const propName in changes) {
            if (propName === "place" && !changes[propName].isFirstChange()) {
                this.place = changes[propName].currentValue;
                this.map.removeObjects(this.map.getObjects());
                this.map.setCenter(this.place.position);
                this.map.setZoom(16);
                const marker = new H.map.Marker({ lat: this.place.position.lat, lng: this.place.position.lng });
                marker.draggable = true;
                this.map.addObject(marker);
            }
        }
    }
    public ngOnInit() {

    }
    public ngAfterViewInit() {

        const defaultLayers = this.platform.createDefaultLayers();
        this.map = new H.Map(this.mapElement.nativeElement, defaultLayers.vector.normal.map, {
            zoom: 10,
            center: { lat: this.place.position.lat, lng: this.place.position.lng }
        });
        const ui = H.ui.UI.createDefault(this.map, defaultLayers, "ru-RU");
        if (this.place.position) {
            const marker = new H.map.Marker(
                new H.geo.Point(this.place.position.lat.toFixed(6), this.place.position.lng.toFixed(6))
            );
            this.map.setCenter({ lat: this.place.position.lat.toFixed(6), lng: this.place.position.lng.toFixed(6) });
            this.map.setZoom(17);
            this.map.addObject(marker);
        }
        const m = this.map;
        if (this.canChangePin) {
            this.map.addEventListener("tap", (ev) => {
                m.removeObjects(m.getObjects());
                const coord = m.screenToGeo(ev.currentPointer.viewportX, ev.currentPointer.viewportY);
                const marker = new H.map.Marker(new H.geo.Point(coord.lat, coord.lng));
                m.setCenter({ lat: coord.lat.toFixed(6), lng: coord.lng.toFixed(6) });
                m.addObject(marker);
                this.locationSet.emit({ lat: coord.lat.toFixed(6), lng: coord.lng.toFixed(6) });
            });

            this.map.addEventListener(
                "dragstart",
                (ev) => {
                    const target = ev.target,
                        pointer = ev.currentPointer;
                    if (target instanceof H.map.Marker) {
                        const targetPosition = m.geoToScreen(target.getGeometry());
                        target["offset"] = new H.math.Point(
                            pointer.viewportX - targetPosition.x,
                            pointer.viewportY - targetPosition.y
                        );
                        behavior.disable();
                    }
                },
                false
            );

            this.map.addEventListener(
                "dragend",
                (ev) => {
                    const target = ev.target;
                    if (target instanceof H.map.Marker) {
                        behavior.enable();
                        this.locationSet.emit({ lat: target.b.lat.toFixed(6), lng: target.b.lng.toFixed(6) });
                    }
                },
                false
            );

            this.map.addEventListener(
                "drag",
                (ev) => {
                    const target = ev.target,
                        pointer = ev.currentPointer;
                    if (target instanceof H.map.Marker) {
                        target.setGeometry(
                            m.screenToGeo(
                                pointer.viewportX - target["offset"].x,
                                pointer.viewportY - target["offset"].y
                            )
                        );
                    }
                },
                false
            );
        }
        const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
    }
}
