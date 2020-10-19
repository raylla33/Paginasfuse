import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import * as _ from 'lodash';

import { FuseConfigService } from '@fuse/services/config.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';

import { navigation } from 'app/navigation/navigation';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
    name: string;
    url: string;
    email: string;
    entrou_em: Date;
    telefone: string;
    status: string;
}

let ELEMENT_DATA: PeriodicElement[] = [
    { url: "/src/assets/images/avatars/Christy.jpg", name: 'Jovenalda Agelina', email: 'rayllaalves @hotmal.com', entrou_em: new Date('05/06/2020'), telefone: '27 9994 4446', status: 'Lider' },
    { url: "/src/assets/images/avatars/Christy.jpg", name: 'Raylla Alves Costa', email: 'rayllaalves @hotmal.com', entrou_em: new Date('05/06/2020'), telefone: '27 9994 4446', status: 'Lider em treinamento' },
    { url: "/src/assets/images/avatars/Christy.jpg", name: 'Raiane Alves Costa', email: 'rayllaalves @hotmal.com', entrou_em: new Date('05/06/2020'), telefone: '28 9994 4446', status: 'Membro' },
    { url: "/src/assets/images/avatars/Christy.jpg", name: 'Hagrario Alves Costa', email: 'rayllaalves @hotmal.com', entrou_em: new Date('05/06/2020'), telefone: '27 9994 4446', status: 'Membro' },
    { url: "/src/assets/images/avatars/Christy.jpg", name: ' Kauê Hugo Rafael Silveira', email: 'rayllaalves @hotmal.com', entrou_em: new Date('05/06/2020'), telefone: '28 9994 4446', status: 'Lider' },
    { url: "/src/assets/images/avatars/Christy.jpg", name: 'Juliana Andreia Monteiro', email: 'rayllaalves @hotmal.com', entrou_em: new Date('05/06/2020'), telefone: '33 9994 4446', status: 'Lider' },
    { url: "/src/assets/images/avatars/Christy.jpg", name: 'Francisca Antonella da Silva', email: 'rayllaalves @hotmal.com', entrou_em: new Date('05/06/2020'), telefone: '27 9994 4446', status: 'Lider' }
];

let ELEMENT_DATA_EX: PeriodicElement[] = [

    { url: "/src/assets/images/avatars/Christy.jpg", name: 'César Anthony Danilo de Paula', email: 'rayllaalves @hotmal.com', entrou_em: new Date('05/06/2020'), telefone: '27 9994 4446', status: 'Ex Membro' },
    { url: "/src/assets/images/avatars/Christy.jpg", name: 'Joana Heloise Melo', email: 'rayllaalves @hotmal.com', entrou_em: new Date('05/06/2020'), telefone: '27 9994 4446', status: 'Ex Membro' },
    { url: "/src/assets/images/avatars/Christy.jpg", name: 'André Pietro Bento da Mota', email: 'rayllaalves @hotmal.com', entrou_em: new Date('05/06/2020'), telefone: '33 9994 4446', status: 'Ex Membro' },
    { url: "/src/assets/images/avatars/Christy.jpg", name: 'Samuel Yuri Mendes', email: 'rayllaalves @hotmal.com', entrou_em: new Date('05/06/2020'), telefone: '28 9994 4446', status: 'Ex Membro' },
    { url: "/src/assets/images/avatars/Christy.jpg", name: 'Samuel Yuri Mendes', email: 'rayllaalves @hotmal.com', entrou_em: new Date('05/06/2020'), telefone: '28 9994 4446', status: 'Ex Membro' },
    { url: "/src/assets/images/avatars/Christy.jpg", name: 'Juliana Andreia Monteiro', email: 'rayllaalves @hotmal.com', entrou_em: new Date('05/06/2020'), telefone: '33 9994 4446', status: 'Ex Membro' },
    { url: "/src/assets/images/avatars/Christy.jpg", name: 'Francisca Antonella da Silva', email: 'rayllaalves @hotmal.com', entrou_em: new Date('05/06/2020'), telefone: '27 9994 4446', status: 'Ex Membro' }
];





@Component({
    selector: 'toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ToolbarComponent implements OnInit, OnDestroy {
    searchMember: string;
    searchTelefone: Number
    searchStatus: String
    displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'status'];
    //   dataSource = ELEMENT_DATA;
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    exMembro = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA_EX);
    tempDataSource: any;
     


    @ViewChild(MatPaginator) paginator: MatPaginator;

    ngAfterViewInit() {
        this.exMembro.paginator = this.paginator;
        this.tempDataSource = this.exMembro;

        this.dataSource.paginator = this.paginator;
        this.tempDataSource = this.dataSource;
    }

    horizontalNavbar: boolean;
    rightNavbar: boolean;
    hiddenNavbar: boolean;
    languages: any;
    navigation: any;
    selectedLanguage: any;
    userStatusOptions: any[];


    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {TranslateService} _translateService
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _fuseSidebarService: FuseSidebarService,
        private _translateService: TranslateService
    ) {
        // Set the defaults
        this.userStatusOptions = [
            {
                title: 'Online',
                icon: 'icon-checkbox-marked-circle',
                color: '#4CAF50'
            },
            {
                title: 'Away',
                icon: 'icon-clock',
                color: '#FFC107'
            },
            {
                title: 'Do not Disturb',
                icon: 'icon-minus-circle',
                color: '#F44336'
            },
            {
                title: 'Invisible',
                icon: 'icon-checkbox-blank-circle-outline',
                color: '#BDBDBD'
            },
            {
                title: 'Offline',
                icon: 'icon-checkbox-blank-circle-outline',
                color: '#616161'
            }
        ];

        this.languages = [
            {
                id: 'pt_br',
                title: 'Brasil',
                flag: 'tr'
            },
            {
                id: 'en',
                title: 'English',
                flag: 'us'
            }
        ];

        this.navigation = navigation;

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }
    pesquisar() {
        const val = this.searchMember?.toUpperCase();
        const tel = this.searchTelefone?.toString();
        const stat = this.searchStatus?.toUpperCase();
        this.tempDataSource = [...ELEMENT_DATA].filter(function (d) {
            return ((d.name.toUpperCase().indexOf(val) !== -1) ||
                d.telefone.toString().indexOf(tel) !== -1 ||
                d.status.toUpperCase().indexOf(stat) !== -1)
        });

        this.dataSource = this.tempDataSource;
        if (this.searchMember == null || this.searchMember == '')
        if (this.searchTelefone == null || this.searchMember == '')
        if (this.searchStatus == null || this.searchMember == '') {
            this.tempDataSource = [...ELEMENT_DATA].filter(x => x.name);

        }
    }

    expesquisar() {
        const val = this.searchMember?.toUpperCase();
        const tel = this.searchTelefone?.toString();
        const stat = this.searchStatus?.toUpperCase();
        this.tempDataSource = [...ELEMENT_DATA_EX].filter(function (d) {
            return ((d.name.toUpperCase().indexOf(val) !== -1) ||
                d.telefone.toString().indexOf(tel) !== -1 ||
                d.status.toUpperCase().indexOf(stat) !== -1)
        });

        this.exMembro = this.tempDataSource;
        if (this.searchMember == null || this.searchMember == '')
        if (this.searchTelefone == null || this.searchMember == '')
        if (this.searchStatus == null || this.searchMember == ''){
            this.tempDataSource = [...ELEMENT_DATA_EX].filter(x => x.name);
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Subscribe to the config changes
        this._fuseConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((settings) => {
                this.horizontalNavbar = settings.layout.navbar.position === 'top';
                this.rightNavbar = settings.layout.navbar.position === 'right';
                this.hiddenNavbar = settings.layout.navbar.hidden === true;
            });

        // Set the selected language from default languages
        this.selectedLanguage = _.find(this.languages, { id: this._translateService.currentLang });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle sidebar open
     *
     * @param key
     */
    toggleSidebarOpen(key): void {
        this._fuseSidebarService.getSidebar(key).toggleOpen();
    }

    /**
     * Search
     *
     * @param value
     */
    search(value): void {
        // Do your search here...
        console.log(value);
    }

    /**
     * Set the language
     *
     * @param lang
     */
    setLanguage(lang): void {
        // Set the selected language for the toolbar
        this.selectedLanguage = lang;

        // Use the selected language for translations
        this._translateService.use(lang.id);
    }
}
