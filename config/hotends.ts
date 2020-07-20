export enum Printer {
    CREALITY_ENDER_3 = 'Creality Ender 3',
    CREALITY_ENDER_3_X = 'Creality Ender 3X',
    CREALITY_ENDER_3_V2 = 'Creality Ender 3 V2',
    CREALITY_ENDER_3_PRO = 'Creality Ender 3 Pro',
    CREALITY_ENDER_5 = 'Creality Ender 5',
    CREALITY_ENDER_5_PRO = 'Creality Ender 5 Pro',
    CREALITY_ENDER_5_PLUS = 'Creality Ender 5 Plus',

    CREALITY_CR10 = 'Creality CR10',
    CREALITY_CR10_V2 = 'Creality 10 V2',
    CREALITY_CR10_MINI = 'Creality CR10 Mini',
    CREALITY_CR10_S = 'Creality CR10 S',
    CREALITY_CR10_S4 = 'Creality CR10 S4',
    CREALITY_CR10_S5 = 'Creality CR10 S5',
    CREALITY_CR10_S_PRO = 'Creality 10 S Pro',
    CREALITY_CR10_S_PRO_V2 = 'Creality 10 S Pro V2',
    CREALITY_CR20 = 'Creality CR20',
    CREALITY_CR10_MAX = 'Creality CR10 Max'
}

//  CR-10, CR-10S, CR-10S4, CR-10S5, CR-20, Ender 3, Ender 3X, or Ender 3 Pro.
export const CREALITY_PRINTER_GROUP_1 = [
    Printer.CREALITY_ENDER_3,
    Printer.CREALITY_ENDER_3_X,
    Printer.CREALITY_ENDER_3_PRO,
    Printer.CREALITY_CR10,
    Printer.CREALITY_CR10_S,
    Printer.CREALITY_CR10_S4,
    Printer.CREALITY_CR10_S5,
    Printer.CREALITY_CR20
];

enum Hotend {
    CREALITY_OEM = 'Creality OEM',
    MICRO_SWISS = 'Micro Swiss',
    MK8 = 'MK8', // find this
    E3D_V6 = 'E36 V6 and clones',
    E3D_VOLCANO = 'E36 Volcano',
    CREALITY_OEM_V6_STYLE = 'V6 Style',
    MOSQUITO = 'Mosquito',
    TH3D_TOUGH = 'TH3D Tough'
}

export const HOTEND_GROUP1 = [
    Hotend.CREALITY_OEM,
    Hotend.CREALITY_OEM_V6_STYLE,
    Hotend.MK8,
    Hotend.MICRO_SWISS
];

export const HOTEND_GROUP2 = [
    Hotend.E3D_V6,
    Hotend.E3D_VOLCANO,
    Hotend.TH3D_TOUGH,
    Hotend.MOSQUITO
];

export const HOTEND_GROUP3 = [
    // same a group1, without V6 style
    Hotend.CREALITY_OEM,
    Hotend.MK8,
    Hotend.MICRO_SWISS
];

export const HOTEND_GROUP4 = [
    // same a group12 without Mosquitto
    Hotend.E3D_V6,
    Hotend.E3D_VOLCANO,
    Hotend.TH3D_TOUGH
];

enum Mod {
    PRINTERMODS_MDD = 'Printer Mods MDD',
    BLV_UPGRADE = 'BLV Upgrade',
    DIRECT_DRIVE_EXTRUDER = 'Direct Drive Extruder'
}

enum Extruder {
    CREALITY_OEM = 'Creality OEM',
    CREALITY_OEM_GEARED = 'Creality OEM Geared',
    BONDTECH_BMG = 'Bondtech BMG',
    E3D_TITAN = 'E3D Titan',
    E3D_HEMERA = 'E3D Hemera',
    SEEMECNC_EZR_STRUDER = 'SeeMeCNC EZR Struder'
}

enum PartFan {
    FAN_4010 = '4010',
    FAN_5015 = '5015',
    FAN_4020 = '4020',
    FAN_5020 = '5020'
}

enum PartFanOption {
    SINGLE_LEFT_DUCT = 'Single Fan Duct on the Left',
    SINGLE_RIGHT_DUCT = 'Single Fan Duct on the Right',
    SINGLE_FAN_DUAL_DUCTS = 'Single Fan, Dual Duct',
    DUAL_FANS_SEPARATE_DUCTS = 'Dual Fans, Separate Left and Right Ducts',
    DUAL_FANS = 'Dual Fans, Dual Ducts (one piece)',
    FORWARD_FANS = 'Forward Fans',
    FANS_30_DEG = 'Fans at 30 deg',
    FAN_GUARD = 'Fan Guard',
    LED_BAR_5015 = 'LED Lightstrip for 5015',
}

enum AblSensor {
    EZABL = 'EZABL',
    EZABL_PRO = 'EZABL_PRO',
    OEM_18MM = 'OEM 18mm',
    OEM_12MM = 'OEM 12mm',
    OEM_8MM = 'OEM 8mm',
    EZABL_MINI = 'EZABL Mini',
    BLTOUCH = 'BLTouch'
}

export type Matchable =
    | Mod
    | Hotend
    | Printer
    | Extruder
    | PartFan
    | PartFanOption
    | AblSensor;

export type Matcher = StandardMatcher | MultiMatcher;

export interface StandardMatcher {
    matches: Matchable[];
    excludeMatches?: Matchable[];
    file?: string;
    oneOfFiles?: string[];
    optionalFiles?: string[];
    subMatchers?: Matcher[];
    subFiles?: string[];
    offsets?: { x?: number; y?: number };
}

export interface MultiMatcherPatternReplace {
    matches: Matchable[];
    searchString: string | string[];
    replaceString: string | string[]; // TODO break this out so that we can verify that the search and replace are the same (either both string or string[])
}

export interface MultiMatcher {
    multiMatches?: {
        replace: MultiMatcherPatternReplace[];
    };
}

const gantryFiles: Matcher[] = [
    {
        matches: [...CREALITY_PRINTER_GROUP_1],
        subMatchers: [
            {
                matches: HOTEND_GROUP1,
                file: 'CR-Ender_OEM-MS_Gantry_Adapter_1A.stl',
                subMatchers: [
                    {
                        matches: [Mod.PRINTERMODS_MDD],
                        file: 'PM_CR-Ender_OEM-MS_Gantry_Adapter_5A.stl',
                        subFiles: ['PM_Gantry_Clip_5.stl']
                    },
                    {
                        matches: [Mod.BLV_UPGRADE],
                        file: 'BLV_Ender_OEM_Gantry_Adapter_8A.stl' // DO you need a clip for this?
                    }
                ]
            },
            {
                matches: HOTEND_GROUP2,
                file: 'CR-Ender_E3D_Gantry_Adapter_1B.stl',
                subMatchers: [
                    {
                        matches: [Mod.PRINTERMODS_MDD],
                        file: 'PM_CR-Ender_E3D_Gantry_Adapter_5B.stl',
                        subFiles: ['PM_Gantry_Clip_5.stl']
                    },
                    {
                        matches: [Mod.BLV_UPGRADE],
                        file: 'BLV_Ender_OEM_Gantry_Adapter_8B.stl' // DO you need a clip for this?
                    }
                ]
            }
        ],
        subFiles: ['CR-Ender_Gantry_Clip_1.stl'],
        offsets: { y: -9 }
    },
    {
        matches: [Printer.CREALITY_ENDER_3_V2],
        subMatchers: [
            {
                matches: HOTEND_GROUP1,
                file: 'Ender_3_v2_OEM_Gantry_Adapter_9A.stl'
            },
            {
                matches: HOTEND_GROUP2,
                file: 'Ender_3_v2_E3D_Gantry_Adapter_9B.stl'
            }
        ]
    },
    {
        matches: [Printer.CREALITY_CR10_V2],
        subMatchers: [
            {
                matches: [Hotend.MK8, Hotend.MICRO_SWISS],
                file: 'CR_MK8-MS_Gantry_Adapter_2A.stl'
            },
            {
                matches: [
                    Hotend.CREALITY_OEM,
                    Hotend.E3D_V6,
                    Hotend.E3D_VOLCANO,
                    Hotend.TH3D_TOUGH,
                    Hotend.MOSQUITO
                ],
                file: 'CR_E3D_Gantry_Adapter_2B.stl'
            }
        ],
        offsets: { y: -9 }
    },
    {
        matches: [Printer.CREALITY_CR10_S_PRO, Printer.CREALITY_CR10_MAX],
        subMatchers: [
            {
                matches: [Hotend.CREALITY_OEM],
                file: 'CR_OEM_Gantry_Adapter_3A.stl'
            },
            {
                matches: HOTEND_GROUP2,
                file: 'CR_E3D_Gantry_Adapter_3B.stl'
            }
        ],
        offsets: { y: -9 }
    },
    {
        matches: [Printer.CREALITY_CR10_S_PRO_V2],
        subMatchers: [
            {
                matches: [Hotend.CREALITY_OEM],
                file: 'CR_OEM_Gantry_Adapter_7A.stl'
            },
            {
                matches: HOTEND_GROUP2,
                file: 'CR_E3D_Gantry_Adapter_7B.stl'
            }
        ],
        offsets: { y: -9 }
    },
    {
        matches: [
            Printer.CREALITY_ENDER_5,
            Printer.CREALITY_ENDER_5_PRO,
            Printer.CREALITY_ENDER_5_PLUS
        ],
        subMatchers: [
            {
                matches: [Hotend.CREALITY_OEM, Hotend.MK8, Hotend.MICRO_SWISS],
                file: 'Ender_OEM-MS_Gantry_Adapter_4A.stl',
                subMatchers: [
                    {
                        matches: [Mod.PRINTERMODS_MDD],
                        file: 'PM_Ender_OEM-MS_Gantry_Adapter_6A.stl',
                        subFiles: ['PM_Gantry_Clip_6.stl']
                    }
                ]
            },
            {
                matches: HOTEND_GROUP2,
                file: 'Ender_E3D_Gantry Adapter_4B.stl',
                subMatchers: [
                    {
                        matches: [Mod.PRINTERMODS_MDD],
                        file: 'PM_Ender_E3D_Gantry_Adapter_6B.stl',
                        subFiles: ['PM_Gantry_Clip_6.stl']
                    }
                ]
            }
        ],
        subFiles: ['Ender_Gantry_Clip_4.stl'],
        offsets: { y: -9 }
    }
];

const baseFiles: Matcher[] = [
    {
        matches: HOTEND_GROUP3, // no V6 Style
        file: 'Hero_Me_Gen5_Base_1.stl',
        subMatchers: [
            {
                matches: [Mod.DIRECT_DRIVE_EXTRUDER],
                file: 'Hero_Me_Gen5_Base_4.stl'
            }
        ]
    },
    {
        matches: [Hotend.CREALITY_OEM_V6_STYLE],
        file: 'Hero_Me_Gen5_Base_5.stl',
        subMatchers: [
            {
                matches: [Mod.DIRECT_DRIVE_EXTRUDER],
                file: 'Hero_Me_Gen5_Base_6.stl'
            }
        ]
    },
    {
        matches: [Hotend.MOSQUITO],
        file: 'Hero_Me_Gen5_Base_7.stl',
        subMatchers: [
            {
                matches: [Mod.DIRECT_DRIVE_EXTRUDER],
                file: 'Hero_Me_Gen5_Base_8.stl'
            }
        ]
    },
    {
        matches: HOTEND_GROUP2,
        file: 'Hero_Me_Gen5_Base_2.stl',
        subFiles: [
            'HMG5_E3D_V6-Clone_Collar.stl',
            'HMG5_E3D_V6-Clone_Air_Dam.stl'
        ],
        subMatchers: [
            {
                matches: [Mod.DIRECT_DRIVE_EXTRUDER],
                file: 'Hero_Me_Gen5_Base_3.stl'
            }
        ]
    }
];

const extruderFiles: Matcher[] = [
    {
        matches: [Mod.PRINTERMODS_MDD],
        subMatchers: [
            {
                matches: [Extruder.CREALITY_OEM],
                file: 'PM_OEM_Extruder_Adapter.stl'
            },
            {
                matches: [Extruder.CREALITY_OEM_GEARED],
                file: 'PM_OEM_Dual_Gear_Extruder_Adapter.stl'
            },
            {
                matches: [Extruder.BONDTECH_BMG],
                oneOfFiles: [
                    'PM_Bondtech_RH_Adapter_1.stl',
                    'PM_Bondtech_LH_Adapter_2.stl',
                    'PM_Bondtech_LH_Adapter_3.stl'
                ]
            },
            {
                matches: [Extruder.E3D_TITAN, Hotend.TH3D_TOUGH],
                oneOfFiles: [
                    'PM_Titan_RH_Adapter_1.stl',
                    'PM_Titan_Mirror_Adapter_2.stl',
                    'PM_Titan_RH_Adapter_3.stl'
                ]
            },
            {
                matches: [Extruder.SEEMECNC_EZR_STRUDER],
                subMatchers: [
                    {
                        matches: [
                            Hotend.CREALITY_OEM,
                            Hotend.MICRO_SWISS,
                            Hotend.E3D_V6
                        ],
                        file: 'PM_EZR_Struder_Adapter_1.stl',
                        optionalFiles: [
                            'PM_EZR_Struder_OEM-MS_Adapter_2_optional.stl',
                            'PM_EZR_Struder_E3D_Adapter_2_optional.stl'
                        ]
                    }
                ]
            }
        ]
    }
];

const fanDuctFiles: Matcher[] = [
    {
        multiMatches: {
            replace: [
                {
                    searchString: '{fan_size}',
                    replaceString: '4010',
                    matches: [PartFan.FAN_4010]
                },
                {
                    searchString: '{fan_size}',
                    replaceString: '4020',
                    matches: [PartFan.FAN_4020]
                },
                {
                    searchString: '{fan_size}',
                    replaceString: '5015',
                    matches: [PartFan.FAN_5015]
                },
                {
                    searchString: '{fan_size}',
                    replaceString: '5020',
                    matches: [PartFan.FAN_5020]
                }
            ]
        },
        subMatchers: [
            {
                matches: [PartFanOption.SINGLE_FAN_DUAL_DUCTS],
                file: '{fan_size}_Single_Radial_Fan_Dual_Ducts.stl',
                subMatchers: [
                    {
                        matches: [PartFanOption.FANS_30_DEG],
                        file:
                            '{fan_size}_30deg_Single_Radial_Fan_Dual_Ducts.stl'
                    }
                ]
            },
            {
                matches: [PartFanOption.DUAL_FANS],
                file: '{fan_size}_Dual_Radial_Fans_Dual_Ducts.stl',
                subMatchers: [
                    {
                        matches: [PartFanOption.FANS_30_DEG],
                        file: '{fan_size}_30deg_Dual_Radial_Fans_Dual_Ducts.stl'
                    },
                    {
                        // spacers required for these
                        matches: [PartFan.FAN_4020, PartFan.FAN_5020],
                        file: '4020_Fan_Mount_Spacer.stl' // It's the same spacer for both so no {fan_size}
                    }
                ]
            },
            {
                matches: [PartFanOption.SINGLE_LEFT_DUCT, PartFanOption.DUAL_FANS_SEPARATE_DUCTS],
                oneOfFiles: [
                    '{fan_size}_Lightweight_Duct_Standard_Left.stl '
                ],
                subMatchers: [
                    {
                        matches: [PartFanOption.FORWARD_FANS],
                        oneOfFiles: [
                            '{fan_size}_Lightweight_Duct_Forward_Left.stl'
                        ]
                    }
                ]
            },
            {
                matches: [PartFanOption.SINGLE_RIGHT_DUCT, PartFanOption.DUAL_FANS_SEPARATE_DUCTS],
                oneOfFiles: [
                    '{fan_size}_Lightweight_Duct_Standard_Right.stl '
                ],
                subMatchers: [
                    {
                        matches: [PartFanOption.FORWARD_FANS],
                        oneOfFiles: [
                            '{fan_size}_Lightweight_Duct_Forward_Right.stl'
                        ]
                    }
                ]
            }
        ]
    }
];

export const ablFiles: Matcher[] = [{
    multiMatches: {
        replace: [
            {
                searchString: ['{abl_type}', '{size}'],
                replaceString: ['EZABL', '_18mm'],
                matches: [AblSensor.EZABL, AblSensor.EZABL_PRO]
            },
            {
                searchString: ['{abl_type}', '{size}'],
                replaceString: ['OEM_Mount', '_18mm'],
                matches: [AblSensor.OEM_18MM]
            },
            {
                searchString: ['{abl_type}', '{size}'],
                replaceString: ['EZABL-OEM', '_12mm'],
                matches: [AblSensor.EZABL_MINI, AblSensor.OEM_12MM]
            },
            {
                searchString: ['{abl_type}', '{size}'],
                replaceString: ['OEM_Mount', '_8mm'],
                matches: [AblSensor.OEM_8MM]
            },
            {
                searchString: ['{abl_type}', '{size}'],
                replaceString: ['BLTouch_Wing', ''],
                matches: [AblSensor.OEM_8MM]
            }
        ]
    },
    subMatchers: [
        {
            matches: [PartFanOption.SINGLE_RIGHT_DUCT],
            file: '{abl_type}_Mount_No_Duct{size}.stl'
        },
        {
            matches: [PartFanOption.SINGLE_FAN_DUAL_DUCTS],
            excludeMatches: [AblSensor.OEM_8MM, AblSensor.OEM_12MM, AblSensor.EZABL_MINI], // These should use medium
            file: '{abl_type}_Mount_Close{size}.stl',
            subMatchers: [
                {
                    matches: [PartFan.FAN_5015],
                    file: '{abl_type}_Mount_Narrow{size}.stl'
                }
            ]
        },
        {
            matches: [PartFanOption.DUAL_FANS_SEPARATE_DUCTS, PartFanOption.DUAL_FANS, AblSensor.OEM_8MM, AblSensor.OEM_12MM, AblSensor.EZABL_MINI],
            file: '{abl_type}_Mount_Medium{size}.stl'
        },
        {
            matches: [PartFan.FAN_4020, PartFan.FAN_5020],
            file: '{abl_type}_Mount_Wide{size}.stl'
        },
        {
            matches: [AblSensor.BLTOUCH],
            oneOfFiles: [
                'BLTouch_Standard_Mount.stl',
                'BLTouch_Flat_Mount.stl'
            ],
            subMatchers: [
                {
                    matches: [PartFanOption.SINGLE_LEFT_DUCT, PartFanOption.DUAL_FANS_SEPARATE_DUCTS],
                    oneOfFiles: [
                        'BLTouch_Wing_Compact.stl',
                        'BLTouch_Slider_Compact.stl'
                    ],
                },
            ]
        },
    ]

}];

export const optionalFiles: Matcher[] = [
    {
        matches: [PartFanOption.FAN_GUARD],
        oneOfFiles: [
            'HMG5_Jet_Fan_Guard.stl',
            'HMG5_Turbine_Fan_Guard.stl',
        ]
    },
    {
        matches: [PartFan.FAN_5015, PartFanOption.LED_BAR_5015],
        file: 'LED_Bar_for_Lightweight_5015_Ducts.stl'
    }
];
