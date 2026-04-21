import React, { ReactNode, useState } from 'react'
import { COLORS } from '@/src/theme/global'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import { useThemeColors } from '@/src/hooks/useThemeColors'

interface NewsData {
    title: string,
    description: string,
    subject: string,
    image: any,
    date: string,
    by: string
}

interface CardProps {
    color?: string,
    data: NewsData,
    showDescription?: boolean,
    showAction?: boolean,
    actions?: ReactNode,
    showSubjects?: boolean,
    showDate?: boolean,
    showImage?: boolean,
    minHeigth?: number,
    showCreator?: boolean
}

export default function Card({
    color,
    data,
    showDescription = true,
    showAction = true,
    actions,
    showSubjects = true,
    showDate = true,
    showImage = true,
    showCreator = true,
    minHeigth = 100
}: CardProps) {

    const [isFavorite, setIsFavorite] = useState(true);
    const theme = useThemeColors();

    return (
        <TouchableOpacity activeOpacity={0.8} style={[styles.container, { backgroundColor: color || theme.cardBackground, minHeight: minHeigth }]}>
            {showImage && data.image && (
                <Image
                    style={styles.image}
                    source={data.image}
                />
            )}

            <View style={styles.rightContent}>
                {showSubjects && data.subject && (
                    <Text style={[styles.subject, { backgroundColor: COLORS.badges.blue + 60, color: theme.cardSubject }]}>
                        {data.subject}
                    </Text>
                )}

                <Text style={[styles.title, { color: theme.cardTitle }]} numberOfLines={showDescription ? undefined : 2}>
                    {data.title}
                </Text>

                {showCreator && data.by && (
                    <Text style={[styles.by, { color: theme.textMuted }]}>
                        por {data.by}
                    </Text>
                )}

                {showDescription && data.description && (
                    <Text style={[styles.description, { color: theme.cardDescription }]} numberOfLines={2}>
                        {data.description}
                    </Text>
                )}

                {showDate && data.date && (
                    <Text style={[styles.date, { color: theme.cardDate }]}>
                        {data.date}
                    </Text>
                )}

            {showAction && (
                <View style={styles.footer}>
                    {actions ? actions : (
                        <>
                            <View style={{ flexDirection: 'row', gap: 5 }}>
                                <Entypo
                                    name="share"
                                    size={18}
                                    color={theme.textDisabled}
                                />
                                <Ionicons
                                    name="bookmark"
                                    size={18}
                                    color={theme.textDisabled}
                                />
                                <Ionicons
                                    name="heart"
                                    size={18}
                                    color={theme.textDisabled}
                                />
                            </View>
                        </>

                    )}
                </View>
            )}
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderRadius: 2,
        flex:1,
        padding: 10,
        gap: 15,
        alignItems: 'flex-start'
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 2,
        objectFit: 'cover',
    },
    rightContent: {
        flex: 1,
        gap: 4,
        paddingVertical: 2
    },
    subject: {
        alignSelf: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderRadius: 100,
        fontSize: 10,
        fontWeight: '600',
        marginBottom: 5,
        textTransform: 'uppercase',
    },
    title: {
        fontSize: 15,
        fontWeight: '600',
        lineHeight: 18,
    },
    by: {
        fontSize: 12,
    },
    description: {
        fontSize: 13,
        lineHeight: 18,
    },
    date: {
        fontSize: 11,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 5,
        alignItems: 'flex-end',
        marginBottom: 4,
    }
})
